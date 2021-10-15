import { Typography } from '@material-ui/core';
import useStyles from './styles';

function ChatMessage({ sender, text }) {
  const classes = useStyles();

  return (
    <div className={classes.messageContainer}>
      <Typography variant="subtitle1">{sender}</Typography>
      <Typography variant="h5">{text}</Typography>
    </div>
  );
}
export default ChatMessage;
