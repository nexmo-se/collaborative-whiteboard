import React from 'react';
import { OTWhiteBoard } from 'opentok-react-whiteboard';

import { useEffect, useRef } from 'react';
import { apiKey, token, sessionId } from '../../config';

import { usePublisher } from '../../hooks/usePublisher';
import { useSession } from '../../hooks/useSession';
import Chat from '../Chat';
import { useChat } from '../../hooks/useChat';

function Main() {
  const videoContainer = useRef();
  const { session, createSession, connected, streams } = useSession({
    container: videoContainer,
  });

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
    <div className="main">
      <div className="participantsContainer">
        <div className="video" ref={videoContainer} id="video-container"></div>
        {/* <Chat messages={messages} sendChatMessage={sendChatMessage} /> */}
        {/* <OTWhiteBoard /> */}
        <div className="video ">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/VTnDYxwhSaI?autoplay=1&vq=hd720"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <Chat messages={messages} sendChatMessage={sendChatMessage} />
      </div>
      {/* className={classes.streams}
        ref={videoContainer} */}
    </div>
  );
}

export default Main;
