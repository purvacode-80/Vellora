import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useGoogleLogin } from '@react-oauth/google';

const FullCalendarOAuth = () => {
  const [events, setEvents] = useState([]);
  const [token, setToken] = useState(null);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.events.readonly',
    onSuccess: (tokenResponse) => setToken(tokenResponse.access_token),
    onError: () => console.error('Login failed'),
  });

  useEffect(() => {
    if (!token) return;
    const fetchEvents = async () => {
      const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      const formatted = (data.items || []).map(event => ({
        title: event.summary,
        start: event.start?.dateTime || event.start?.date,
        end: event.end?.dateTime || event.end?.date,
      }));

      setEvents(formatted);
    };

    fetchEvents();
  }, [token]);

  return (
    <div>
      {!token ? (
        <button onClick={() => login()}>Sign in to Load Calendar</button>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
        />
      )}
    </div>
  );
};

export default FullCalendarOAuth;