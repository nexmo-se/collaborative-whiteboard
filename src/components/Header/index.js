import React from 'react';

function Header() {
  return (
    <div className="toolbar">
      <img
        src={process.env.PUBLIC_URL + '/Vonage.png'}
        className="vonage-logo"
        alt="vonage-logo"
        style={{ height: 50 }}
      />
      <h3 className="text">Programmable Renderer</h3>
    </div>
  );
}

export default Header;
