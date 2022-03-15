import LM from 'opentok-layout-js';

import React, { useState, useRef, useCallback } from 'react';

// const OT = window.OT;
export function useLayout() {
  const layout = useRef(null);
  // let layout;

  React.useEffect(() => {
    const element = document.getElementById('video-container');
    if (element) {
      layout.current = LM(element, {
        fixedRatio: true,
        bigFirst: false,
        bigFixedRatio: true,
        bigAlignItems: 'left',
      });

      layout.current.layout();
    }
  }, []);

  return {
    layout: layout.current,
  };
}
