// @flow
import React from 'react';
import clsx from 'clsx';
import useStyles from './styles';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

function VideoHoverContainer({ children }) {
  const [visible, setVisible] = React.useState(false);
  const mStyles = useStyles();

  function handleMouseEnter() {
    setVisible(true);
  }

  function handleMouseLeave() {
    setVisible(false);
  }

  return (
    <div
      className={mStyles.layer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={clsx({
          [mStyles.root]: true,
          [mStyles.hidden]: !visible,
        })}
      >
        {children}
      </div>
    </div>
  );
}
export default VideoHoverContainer;
