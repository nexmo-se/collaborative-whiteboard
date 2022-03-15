// @flow
import React from 'react';
import { Publisher } from '@opentok/client';
import { IconButton } from '@mui/material';
import useStyles from './styles';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import { usePublisher } from '../../hooks/usePublisher';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function VideoControl({
  videoContainer,
  currentSession,
  publisher,
  layout,
}) {
  const {
    publisher: screenPublisher,
    publish,
    unpublish,
    pubInitialised,
  } = usePublisher();

  const [hasAudio, setHasAudio] = useState(true);
  const [hasVideo, setHasVideo] = useState(true);
  const [sharing, setSharing] = useState(false);
  const session = useRef(null);
  const mStyles = useStyles();

  const toggleVideo = useCallback(() => {
    if (publisher) {
      publisher.publishVideo(!hasVideo);
      setHasVideo(!hasVideo);
    } else {
      console.log('no publisher');
    }
  }, [hasVideo, publisher]);

  const toggleAudio = useCallback(() => {
    if (publisher) {
      publisher.publishAudio(!hasAudio);
      setHasAudio(!hasAudio);
    } else {
      console.log('no publisher');
    }
  }, [publisher, hasAudio]);

  async function toggleShareScreenClick() {
    if (session.current && videoContainer && !sharing) {
      await publish({
        session: session.current,
        containerId: videoContainer.id,
        publisherOptions: { videoSource: 'screen' },
      });
      setSharing(true);
      layout.layout();
    } else if (session.current && sharing) {
      unpublish({ session: session.current });
      layout.layout();
      setSharing(false);
    }
  }

  const streamCreatedListener = useCallback((e) => {
    console.log(e);
    setSharing(true);
  }, []);
  const streamDestroyedListener = useCallback(() => {
    setSharing(false);
  }, []);

  useEffect(() => {
    if (screenPublisher)
      screenPublisher.on('streamCreated', streamCreatedListener);
    if (screenPublisher)
      screenPublisher.on('streamDestroyed', streamDestroyedListener);
    return function cleanup() {
      if (screenPublisher)
        screenPublisher.off('streamCreated', streamCreatedListener);
      if (screenPublisher)
        screenPublisher.off('streamDestroyed', streamDestroyedListener);
    };
  }, [screenPublisher, streamCreatedListener, streamDestroyedListener]);

  useEffect(() => {
    if (!pubInitialised && sharing) {
      setSharing(false);
    }
  }, [pubInitialised, sharing]);

  useEffect(() => {
    if (!session.current) {
      session.current = currentSession;
    }
    return () => {
      session.current = null;
    };
  }, [currentSession]);

  return (
    <div className={mStyles.root}>
      {/* {children} */}
      <IconButton onClick={toggleAudio}>
        <MicIcon sx={{ fontSize: 40 }} color="primary" />
      </IconButton>
      <IconButton onClick={toggleVideo}>
        <VideocamIcon sx={{ fontSize: 40 }} color="primary" />
      </IconButton>
      <IconButton>
        <FiberManualRecordIcon sx={{ fontSize: 40 }} color="primary" />
      </IconButton>
      <IconButton onClick={toggleShareScreenClick}>
        <ScreenShareIcon sx={{ fontSize: 40 }} color="primary" />
      </IconButton>
    </div>
  );
}
