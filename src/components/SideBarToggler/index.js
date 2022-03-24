import { IconButton } from '@mui/material';
import React from 'react';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOff';

function SideBarToggler({ handleSideNavToggle, button, layout }) {
  return (
    <IconButton
      onClick={() => {
        layout.layout();
        button === 'open'
          ? handleSideNavToggle(true)
          : handleSideNavToggle(false);
      }}
      edge="start"
      aria-label="videoCamera"
      fontSize="large"
      component="span"
    >
      {button === 'open' ? (
        <ToggleOnIcon sx={{ fontSize: 40 }} color="primary" />
      ) : (
        <ToggleOffIcon sx={{ fontSize: 40 }} color="primary" />
      )}
    </IconButton>
  );
}

export default SideBarToggler;
