import LM from 'opentok-layout-js';

import React, { useState, useRef, useCallback } from 'react';

// const OT = window.OT;
export function useResizeObserver({ id }) {
  const resize_ob_ref = useRef(null);
  const width = useRef(null);
  const height = useRef(null);
  // let layout;

  resize_ob_ref.current = new ResizeObserver(function (entries) {
    // since we are observing only a single element, so we access the first element in entries array
    let rect = entries[0].contentRect;

    // current width & height
    width.current = rect.width;
    height.current = rect.height;

    console.log('Current Width : ' + width);
    console.log('Current Height : ' + height);
  });

  const setUpObserver = (id) => {
    resize_ob_ref.current.observe(document.getElementById(id));
  };

  const stopObserving = (id) => {
    resize_ob_ref.unobserve(document.getElementById(id));
  };

  return {
    setUpObserver,
    stopObserving,
    width,
    height,
  };
}
