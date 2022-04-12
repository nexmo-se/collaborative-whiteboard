import styles from './styles.js';
import React from 'react';

import { useEffect, useRef, useState, useCallback, useContext } from 'react';
import { useParams } from 'react-router';
import Main from '../Main/index.js';
import clsx from 'clsx';
import { usePublisher } from '../../hooks/usePublisher';
import { useSession } from '../../hooks/useSession';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import VideoHoverContainer from '../VideoHoverContainer';
import VideoControl from '../VideoControl';
import Chat from '../Chat';
// import fixChrome687574 from '../../utils';
import Whiteboard from '../WhiteBoard';
import { IconButton } from '@mui/material';
import { useChat } from '../../hooks/useChat';

// import { getCredentials } from '../../api/fetchCreds';
// import { PreferencesContext } from '../../context/PreferencesContext';
// import { useSignalling } from '../../hooks/useSignalling';
import SideBarToggler from '../SideBarToggler';
import SideNav from '../SideNav';
import { apiKey, token, sessionId } from '../../config';

function VirtualView() {
  const [credentials, setCredentials] = useState(null);
  // const [timePlayingLeft, setTime] = useState(0);
  const videoContainer = useRef();
  let { roomName } = useParams();
  //   const { preferences } = useContext(PreferencesContext);
  const { session, createSession, connected, streams, layout } = useSession({
    container: videoContainer,
  });

  const [tabOpened, setTabOpened] = useState('three');

  const [isSideNavOpened, setSideNavOpened] = useState(true);
  const handleSideNavToggle = (isopen) => {
    setSideNavOpened(isopen);
  };

  const { messages } = useChat({
    session: session.current,
  });

  useEffect(() => {
    if (apiKey && sessionId && token) {
      createSession({ apiKey, sessionId, token });
    }
  }, [createSession, credentials]);

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
              // handleChangeTab={handleChangeTab}
              tabOpened={tabOpened}
              isSideNavOpened={isSideNavOpened}
              // sendChatMessage={sendChatMessage}
              messages={messages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtualView;
