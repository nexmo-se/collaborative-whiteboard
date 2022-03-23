import React from 'react';
import Whiteboard from '../WhiteBoard';

import clsx from 'clsx';

import { usePublisher } from '../../hooks/usePublisher';
import { useSession } from '../../hooks/useSession';
import Chat from '../Chat';
import { useChat } from '../../hooks/useChat';

function TabContent({ tabSelected, session }) {
  const { messages, sendMessage } = useChat({
    session: session,
  });

  const sendChatMessage = (message) => {
    sendMessage({ message });
  };
  return (
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
  );
}

export default TabContent;
