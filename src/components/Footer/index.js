import React from 'react';
import LeaveButton from '../LeaveButton';

function Footer() {
  return (
    <div className="mainControl">
      <div className="left">{/* <ShareButton /> */}</div>
      <div className="middle">
        <button>het</button>
        <button>soledad</button>
      </div>
      <div className="right">
        <LeaveButton />
      </div>
    </div>
  );
}

export default Footer;
