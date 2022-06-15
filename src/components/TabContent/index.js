import React from 'react';
import Whiteboard from '../WhiteBoard';

import clsx from 'clsx';

import { usePublisher } from '../../hooks/usePublisher';
import { useSession } from '../../hooks/useSession';
import Chat from '../Chat';
import { useChat } from '../../hooks/useChat';

function TabContent({ tabSelected, sendChatMessage, messages }) {
  //   const { messages, sendMessage } = useChat({
  //     session: session,
  //   });

  //   const sendChatMessage = (message) => {
  //     sendMessage({ message });
  //   };
  return (
    <div className="participants">
      {tabSelected === 'one' && (
        <Chat messages={messages} sendChatMessage={sendChatMessage} />
      )}
      {tabSelected === 'two' && (
        <Whiteboard
          url={
            'https://javier58203.invisionapp.com/freehand/Untitled-iQnq4UyY0?dsid_h=2ed0a5efcdb26f5474296992357da9f15f2c0046fb965b88dd7815bd6e6a2f9a&uid_h=44ecf9d34e8dbe8592babb44605e879ca1ff432743d90c69258b705106c87d89'
          }
        />
      )}
      {tabSelected === 'three' && (
        <Whiteboard
          url={
            'https://javier58203.invisionapp.com/freehand/Firstone-vt0ufPx0X?dsid_h=7cb4732fc83fda999c25095989d0f5d293c6be134ec7b4b5aaf30188dc62674d&uid_h=44ecf9d34e8dbe8592babb44605e879ca1ff432743d90c69258b705106c87d89'
          }
        />
      )}
    </div>
  );
}

export default TabContent;
