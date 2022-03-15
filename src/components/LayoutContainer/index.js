import React from 'react';

import clsx from 'clsx';
import lodash from 'lodash';

import useStyles from './styles';
import { useSession } from '../../hooks/useSession';

function LayoutContainer({ id, size = 'big', hidden, children }) {
  const containerRef = React.useRef();
  //   const { streams, session } = useSession({
  //     container: containerRef.current,
  //   });
  //   const mStyles = useStyles();

  const layoutRef = React.useRef();

  React.useEffect(() => {
    layoutRef.current.init();
    layoutRef.current.manager.layout();
    console.log(layoutRef.current);
    // const observer = new MutationObserver((mutationList) => {
    //   for (const mutation of mutationList) {
    //     if (mutation.type === 'childList')
    //       layoutRef.current.layout(session, streams);
    //   }
    // });
    // if (containerRef.current)
    //   observer.observe(containerRef.current, { childList: true });
  }, [id]);

  //   React.useEffect(() => {
  //     if (layoutRef.current) layoutRef.current.layout(session, streams);
  //   }, [session, streams, size]);

  //   React.useEffect(() => {
  //     window.addEventListener(
  //       'resize',
  //       lodash.debounce(() => {
  //         if (layoutRef.current) layoutRef.current.layout(session, streams);
  //       }, 150)
  //     );
  //   }, [session, streams]);

  return (
    <div
      id={id}
      ref={containerRef}
      className={'big'}
      //   className={clsx({
      //     [mStyles.container]: true,
      //     [mStyles.black]: true,
      //     [mStyles.big]: size === 'big',
      //     [mStyles.hidden]: hidden,
      //     [mStyles.screen]: size === 'screen',
      //   })}
    >
      {children}
    </div>
  );
}
export default LayoutContainer;
