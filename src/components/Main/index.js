import React from 'react';
import { IconButton } from '@mui/material';

import { useEffect, useRef } from 'react';
import { apiKey, token, sessionId } from '../../config';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import VideoHoverContainer from '../VideoHoverContainer';
import VideoControl from '../VideoControl';
// import fixChrome687574 from '../../utils';
import Whiteboard from '../WhiteBoard';

import clsx from 'clsx';

import { usePublisher } from '../../hooks/usePublisher';
import { useSession } from '../../hooks/useSession';
import Chat from '../Chat';
import { useChat } from '../../hooks/useChat';
import { useState } from 'react';

function Main() {
  const videoContainer = useRef();
  const [tabSelected, setTabSelected] = useState('one');
  const { session, createSession, connected, streams, layout } = useSession({
    container: videoContainer,
  });

  const [isSideNavOpened, setSideNavOpened] = useState(true);

  const { messages, sendMessage } = useChat({
    session: session.current,
  });

  const { publisher, publish, pubInitialised } = usePublisher();

  useEffect(() => {
    if (apiKey && sessionId && token) {
      createSession({ apiKey, sessionId, token });
    }
  }, [createSession]);

  const sendChatMessage = (message) => {
    sendMessage({ message });
  };

  useEffect(() => {
    if (layout) layout.layout();
  }, [layout, isSideNavOpened]);

  useEffect(() => {
    if (
      session.current &&
      connected &&
      !pubInitialised &&
      videoContainer.current
    ) {
      // todo It might be better to change state of this component.
      publish({
        session: session.current,
        containerId: videoContainer.current.id,
      });

      // playPauseVideo();
    }
  }, [publish, session, connected, pubInitialised]);

  return (
    <div className="main">
      <div
        id="showdiv"
        className={clsx({
          showbutton: true,
          hidden: isSideNavOpened,
        })}
      >
        <IconButton
          onClick={() => {
            setSideNavOpened(true);
          }}
          edge="start"
          aria-label="videoCamera"
          fontSize="large"
          component="span"
        >
          <ToggleOnIcon color="primary" sx={{ fontSize: 40 }} />
        </IconButton>
      </div>

      <div className="flexbox">
        <div
          className={clsx({
            video: true,
            fullwidth: !isSideNavOpened,
            chatOpened: tabSelected === 'one',
          })}
          ref={videoContainer}
          id="video-container"
        ></div>

        <div
          id="right"
          className={clsx({
            right: true,
            hidden: !isSideNavOpened,
          })}
        >
          <div
            className={clsx({
              hidebutton: true,
              hidden: !isSideNavOpened,
            })}
          >
            <IconButton
              onClick={() => {
                setSideNavOpened(false);
              }}
              edge="start"
              aria-label="videoCamera"
              fontSize="large"
              component="span"
            >
              <ToggleOffIcon sx={{ fontSize: 40 }} color="primary" />
            </IconButton>
          </div>

          <div className="sidenav"></div>
          <div className="Vlt-tabs list">
            <ul class="Vlt-tabs__header" role="tablist" aria-label="Example">
              <li
                role="tab"
                aria-selected="true"
                aria-controls="tab-one"
                tabindex="0"
                id="one"
                class="Vlt-tabs__link Vlt-tabs__link_active"
                className={clsx({
                  'Vlt-tabs__link': true,
                  'Vlt-tabs__link_active': tabSelected === 'one',
                })}
              >
                <span
                  onClick={() => {
                    setTabSelected('one');
                  }}
                >
                  Chat
                </span>
              </li>
              <li
                role="tab"
                aria-selected="false"
                aria-controls="tab-two"
                tabindex="-1"
                id="two"
                className={clsx({
                  'Vlt-tabs__link': true,
                  'Vlt-tabs__link_active': tabSelected === 'two',
                })}
              >
                <span
                  onClick={() => {
                    setTabSelected('two');
                  }}
                >
                  Whiteboard
                </span>
              </li>
              <li
                role="tab"
                aria-selected="false"
                aria-controls="tab-three"
                tabindex="-1"
                id="three"
                className={clsx({
                  'Vlt-tabs__link': true,
                  'Vlt-tabs__link_active': tabSelected === 'three',
                })}
              >
                <span
                  onClick={() => {
                    setTabSelected('three');
                  }}
                >
                  Doc editing
                </span>
              </li>
            </ul>
            <div class="Vlt-tabs__content">
              <div
                tabindex="0"
                role="tabpanel"
                id="tab-one"
                aria-labelledby="one"
                hidden="true"
                class="Vlt-tabs__panel Vlt-tabs__panel_active"
              ></div>
              <div
                tabindex="0"
                role="tabpanel"
                id="tab-two"
                aria-labelledby="two"
                hidden="false"
                class="Vlt-tabs__panel"
              ></div>
              <div
                tabindex="0"
                role="tabpanel"
                id="tab-disabled"
                aria-labelledby="disabled"
                hidden="false"
                class="Vlt-tabs__panel"
              ></div>
            </div>
            <div className="participants">
              {tabSelected === 'one' && (
                <Chat messages={messages} sendChatMessage={sendChatMessage} />
              )}
              {tabSelected === 'two' && (
                <Whiteboard
                  url={
                    'https://javier58203.invisionapp.com/freehand/Untitled-apqnRCKm?dsid_h=0213b0c0cdc67400c8a3825354a697fbac48c9b6cd66b4ef87b9b1dfc8f867ca&uid_h=44ecf9d34e8dbe8592babb44605e879ca1ff432743d90c69258b705106c87d89'
                  }
                />
              )}
              {tabSelected === 'three' && (
                <Whiteboard
                  url={
                    'https://javier58203.invisionapp.com/freehand/Untitled-BRi5YW8yS?dsid_h=d5d6d9b8b27fa4534aef798cb3a8fe9e52295e05adb1818820d9dc9310a6bdc2&uid_h=44ecf9d34e8dbe8592babb44605e879ca1ff432743d90c69258b705106c87d89'
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {pubInitialised && (
        <VideoHoverContainer>
          <VideoControl
            currentSession={session.current}
            publisher={publisher}
            videoContainer={videoContainer.current}
            layout={layout}
          />
        </VideoHoverContainer>
      )}
    </div>
  );
}

export default Main;
