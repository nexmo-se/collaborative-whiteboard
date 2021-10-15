import React, { useState } from 'react';
import styles from './styles';

import { styled } from '@mui/material/styles';

// import { IconButton, TextField } from '@material-ui/core';
import { IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function ChatInput({ className, sendMessage }) {
  const CssTextField = styled(TextField)({
    '.MuiInputBase-input': {
      color: 'white',
      fontSize: 16,
    },
  });

  const [text, setText] = useState('');

  function handleClick(e) {
    if (e) {
      e.preventDefault();
    }
    sendMessage(text);
    /* const message = new Message(user, text, isApproved);
    mMessage.send({ message }); */

    setText('');
  }

  function handleOnChange({ target }) {
    setText(target.value);
  }

  return (
    // <div>
    <form className={className} onSubmit={handleClick}>
      <CssTextField
        autoFocus
        style={{ width: '250px', marginLeft: '50px' }}
        // defaultValue="Normal"
        value={text}
        color="primary"
        variant="standard"
        onChange={handleOnChange}
      />

      <IconButton type="submit" text="Send" onClick={handleClick}>
        <SendIcon color="primary"></SendIcon>
      </IconButton>
    </form>
    // </div>
  );
}
export default ChatInput;
