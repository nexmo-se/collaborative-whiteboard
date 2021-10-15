import { List, ListItem, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import useStyles from './styles';
import ChatInput from '../ChatInput';
import ChatMessage from '../ChatMessage';

const anchor = 'right'; // https://material-ui.com/api/drawer/

function Chat({ messages, sendChatMessage }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <Typography
          style={{ color: 'white', margin: 'auto' }}
          variant="h4"
          component="h2"
        >
          Chat
        </Typography>
        <List className={classes.messageList}>
          {messages.map((msg, index) => (
            <ListItem key={msg.id}>
              <ChatMessage sender={msg.sender} text={msg.text} />
            </ListItem>
          ))}
        </List>
        <ChatInput
          className={classes.chatInput}
          sendMessage={sendChatMessage}
        ></ChatInput>
      </div>
    </>
  );
}
export default Chat;
