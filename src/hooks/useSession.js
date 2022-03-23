import React, { useState, useRef, useCallback, useEffect } from 'react';
import OT from '@opentok/client';
import LM from 'opentok-layout-js';
import { isFunction } from 'lodash';
import {
  determinePreferredFrameRate,
  determinePreferredResolution,
} from '../utils';
// import { useLayout } from '../hooks/useLayout';

// const OT = window.OT;
export function useSession({ container }) {
  const [connected, setConnected] = useState(false);
  // const { layout } = useLayout();
  const [streams, setStreams] = useState([]);

  const sessionRef = useRef(null);
  const layout = useRef(null);
  // // let layout;

  const resizeTimeout = useRef(null);

  useEffect(() => {
    if (container.current) {
      const element = document.getElementById(container.current.id);
      if (element) {
        layout.current = LM(element, {
          // fixedRatio: true,
          // bigFirst: false,
          bigFixedRatio: true,
          maxRatio: 3 / 2,
          minRatio: 9 / 16,
          bigAlignItems: 'left',
        });

        layout.current.layout();

        window.onresize = function () {
          clearTimeout(resizeTimeout);
          resizeTimeout.current = setTimeout(function () {
            layout.current.layout();
          }, 20);
        };
      }
    }
  }, [container]);

  // useEffect(() => {
  //   streams.forEach((stream) => {
  //     const subscribers = sessionRef.current.getSubscribersForStream(stream);
  //     console.log(stream.id);
  //     subscribers.forEach((subscriber) => {
  //       console.log('height: ' + subscriber.element.offsetHeight);
  //       console.log('width: ' + subscriber.element.offsetWidth);

  //       subscriber.setPreferredResolution({
  //         width: subscriber.element.offsetWidth,
  //         height: subscriber.element.offsetHeight,
  //       });
  //     });
  //   });
  // }, [layout, streams]);

  useEffect(() => {
    if (streams.length > 0) {
      const framerateToSet = determinePreferredFrameRate(streams.length);
      const resolutionToSet = determinePreferredResolution(streams.length);
      console.log(resolutionToSet);
      console.log(framerateToSet);

      streams.forEach((stream) => {
        const subscribers = sessionRef.current.getSubscribersForStream(stream);
        subscribers.forEach((subscriber) => {
          subscriber.setPreferredFrameRate(framerateToSet);
          subscriber.setPreferredResolution(resolutionToSet);
        });
      });
    }
  }, [streams]);

  const addStream = ({ stream }) => {
    setStreams((prev) => [...prev, stream]);
  };

  const removeStream = ({ stream }) => {
    setStreams((prev) =>
      prev.filter((prevStream) => prevStream.id !== stream.id)
    );
  };

  const subscribe = React.useCallback(
    (stream, options = {}) => {
      if (sessionRef.current && container.current) {
        const finalOptions = Object.assign({}, options, {
          insertMode: 'append',
          width: '100%',
          height: '100%',
          fitMode: 'contain',
          style: {
            buttonDisplayMode: 'off',
            nameDisplayMode: 'on',
          },
          showControls: false,
        });
        const subscriber = sessionRef.current.subscribe(
          stream,
          // 'screenContainer',
          container.current.id,
          finalOptions
        );
      }
    },
    [container]
  );

  const onStreamCreated = useCallback(
    (event) => {
      subscribe(event.stream);
      addStream({ stream: event.stream });

      if (event.stream.videoType === 'screen') {
        const [subscriber] = sessionRef.current.getSubscribersForStream(
          event.stream
        );
        const subscriberEl = document.getElementById(subscriber.id);
        subscriberEl.classList.add('OT_big');
      }

      // const framerateToSet = determinePreferredFrameRate(streams.length);
      console.log(event.stream);
      if (layout) {
        console.log(layout);
        layout.current.layout();
      }
    },
    [subscribe]
  );

  const onStreamDestroyed = useCallback((event) => {
    console.log('destroyed');
    // layout.layout();
    removeStream({ stream: event.stream });
    sessionRef.current
      .getSubscribersForStream(event.stream)
      .forEach((subscriber) => {
        subscriber.element.classList.remove('ot-layout');
        setTimeout(() => {
          subscriber.destroy();
          layout.current.layout();
        }, 200);
      });
  }, []);

  const createSession = useCallback(
    ({ apiKey, sessionId, token }) => {
      if (!apiKey) {
        throw new Error('Missing apiKey');
      }

      if (!sessionId) {
        throw new Error('Missing sessionId');
      }

      if (!token) {
        throw new Error('Missing token');
      }

      sessionRef.current = OT.initSession(apiKey, sessionId, {
        // iceConfig: {
        //   includeServers: 'all',
        //   transportPolicy: 'relay',
        //   customServers: [
        //     {
        //       urls: []
        //     }
        //   ]
        // }
      });
      const eventHandlers = {
        streamCreated: onStreamCreated,
        streamDestroyed: onStreamDestroyed,
      };
      sessionRef.current.on(eventHandlers);
      return new Promise((resolve, reject) => {
        sessionRef.current.connect(token, (err) => {
          if (!sessionRef.current) {
            // Either this session has been disconnected or OTSession
            // has been unmounted so don't invoke any callbacks
            return;
          }
          if (err) {
            reject(err);
          } else if (!err) {
            console.log('Session Connected!');
            setConnected(true);
            resolve(sessionRef.current);
          }
        });
      });
    },
    [onStreamCreated, onStreamDestroyed]
  );

  const destroySession = React.useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.on('disconnected', () => {
        sessionRef.current = null;
      });
      sessionRef.current.disconnect();
    }
  }, []);

  return {
    session: sessionRef,
    connected,
    createSession,
    destroySession,
    streams,
    layout: layout.current,
  };
}
