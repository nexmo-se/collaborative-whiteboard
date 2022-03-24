import React from 'react';
import { IconButton } from '@mui/material';

import { useEffect, useRef } from 'react';
import { apiKey, token, sessionId } from '../../config';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import VideoHoverContainer from '../VideoHoverContainer';
import VideoControl from '../VideoControl';
import SideNav from '../SideNav';
// import fixChrome687574 from '../../utils';
import Whiteboard from '../WhiteBoard';

import clsx from 'clsx';

import { usePublisher } from '../../hooks/usePublisher';
import { useSession } from '../../hooks/useSession';

import { useChat } from '../../hooks/useChat';
import { useState } from 'react';
import TabContent from '../TabContent';
import SideBarToggler from '../SideBarToggler';

function Main() {
  const videoContainer = useRef();
  const [tabSelected, setTabSelected] = useState('one');
  const { session, createSession, connected, streams, layout } = useSession({
    container: videoContainer,
  });
  const [tabOpened, setTabOpened] = useState('one');

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

  const handleChangeTab = (tab) => {
    setTabOpened(tab);
  };
  const handleSideNavToggle = (isopen) => {
    setSideNavOpened(isopen);
  };

  const sendChatMessage = (message) => {
    sendMessage({ message });
  };

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
    }
  }, [publish, session, connected, pubInitialised]);

  return (
    <div className="wrapper">
      <div className="main">
        <div
          id="showdiv"
          className={clsx({
            showbutton: true,
            hidden: isSideNavOpened,
          })}
        >
          <SideBarToggler
            button="open"
            handleSideNavToggle={handleSideNavToggle}
            layout={layout}
          />
        </div>

        <div className="flexbox">
          <div
            className={clsx({
              video: true,
              fullwidth: !isSideNavOpened,
              // chatOpened: true,
              chatOpened: tabOpened === 'one',
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
              <SideBarToggler
                button="close"
                handleSideNavToggle={handleSideNavToggle}
                layout={layout}
              />
            </div>

            <div className="sidenav"></div>
            <SideNav
              layout={layout}
              handleChangeTab={handleChangeTab}
              tabOpened={tabOpened}
              isSideNavOpened={isSideNavOpened}
              sendChatMessage={sendChatMessage}
              messages={messages}
            />
          </div>
        </div>
        {pubInitialised && (
          <VideoHoverContainer>
            <VideoControl
              currentSession={session.current}
              publisher={publisher}
              videoContainer={videoContainer.current}
              layout={layout}
              isSideNavOpened={isSideNavOpened}
              tabSelected={tabSelected}
            />
          </VideoHoverContainer>
        )}
      </div>
    </div>
  );
}

export default Main;
