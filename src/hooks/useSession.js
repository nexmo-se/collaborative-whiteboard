import React, { useState, useRef, useCallback, useEffect } from 'react';
import OT from '@opentok/client';
import LM from 'opentok-layout-js';
import {
  determinePreferredFrameRate,
  determinePreferredResolution,
} from '../utils';

// const OT = window.OT;
export function useSession({ container }) {
  const [connected, setConnected] = useState(false);
  // const { layout } = useLayout();
  const [streams, setStreams] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  const sessionRef = useRef(null);
  const layout = useRef(null);
  // // let layout;

  const resizeObserver = useRef(null);
  const width = useRef(null);
  const height = useRef(null);

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

  const createResizeObserver = (subscriber) => {
    console.log('creating observer');
    const resizeObserver = new ResizeObserver(function (entries) {
      // since we are observing only a single element, so we access the first element in entries array
      let rect = entries[0].contentRect;

      console.log('Current Width : ' + rect.width);
      console.log('Current Height : ' + rect.height);
      subscriber.setPreferredResolution({
        width: rect.width,
        height: rect.height,
      });

      // current width & height
      // width.current = rect.width;
      // height.current = rect.height;
    });
    return resizeObserver;
  };

  useEffect(() => {
    subscribers.forEach((subscriber) => {
      const resize = createResizeObserver(subscriber);
      resize.observe(document.getElementById(subscriber.id));
    });

    // return () => {
    //   resize.unobserve()
    // };
  }, [subscribers]);

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

  const addSubscribers = ({ subscriber }) => {
    setSubscribers((prev) => [...prev, subscriber]);
  };

  const removeSubscribers = ({ subscriber }) => {
    setSubscribers((prev) =>
      prev.filter((prevSub) => prevSub.id !== subscriber.id)
    );
  };

  const removeStream = ({ stream }) => {
    setSubscribers((prev) =>
      prev.filter((prevStream) => prevStream.id !== stream.id)
    );
  };

  const subscribe = React.useCallback(
    (stream, options = {}) => {
      var el = document.createElement('div');
      el.style.zIndex = 100;
      if (sessionRef.current && container.current) {
        // const finalOptions = Object.assign({}, options, {
        //   insertMode: 'append',
        //   width: '100%',
        //   height: '100%',
        //   fitMode: 'contain',
        //   style: {
        //     buttonDisplayMode: 'off',
        //     nameDisplayMode: 'on',
        //   },
        //   showControls: false,
        // });
        const subscriber = sessionRef.current.subscribe(
          stream,
          el
          // 'screenContainer',
          // container.current.id,
          // finalOptions
        );
        el.addEventListener('dblclick', function () {
          if (el.classList.contains('OT_big')) {
            el.classList.remove('OT_big');
          } else {
            el.classList.add('OT_big');
          }
          layout.current.layout();
        });
        // layoutEl.appendChild(el);
        const element = document.getElementById(container.current.id);
        element.appendChild(el);
        layout.current.layout();
        // layout();
        addSubscribers({ subscriber });
        // createResizeObserver(subscriber);
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
    event.preventDefault();
    console.log('destroyed');

    // layout.layout();
    removeStream({ stream: event.stream });
    sessionRef.current
      .getSubscribersForStream(event.stream)
      .forEach((subscriber) => {
        removeSubscribers({ subscriber });
        subscriber.element.classList.remove('ot-layout');
        setTimeout(() => {
          // removeSubscribers({ subscriber });
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
