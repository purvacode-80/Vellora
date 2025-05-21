// src/components/MeetingRoom.js
import React, { useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const MeetingRoom = () => {
  const { room } = useParams();
  const location = useLocation();
  const jitsiContainer = useRef(null);

  const query = new URLSearchParams(location.search);
  const userName = query.get('name') || 'CRM User';

  useEffect(() => {
    if (window.JitsiMeetExternalAPI) {
      const domain = 'meet.jit.si';
      const options = {
        roomName: room,
        parentNode: jitsiContainer.current,
        userInfo: {
          displayName: userName
        }
      };
      const api = new window.JitsiMeetExternalAPI(domain, options);

      return () => api.dispose();
    } else {
      alert('Jitsi Meet API script not loaded.');
    }
  }, [room, userName]);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div ref={jitsiContainer} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default MeetingRoom;
