// src/Components/GoogleCalendar.jsx
import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleCalendar = () => {
  const [token, setToken] = useState(null);
  const [events, setEvents] = useState([]);

  // Google Calendar API login
  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    onSuccess: (tokenResponse) => {
      setToken(tokenResponse.access_token);
    },
    onError: () => console.error('Login Failed'),
  });

  useEffect(() => {
    if (token) {
      const fetchEvents = async () => {
        try {
          const res = await fetch(
            'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await res.json();
          setEvents(data.items || []);
        } catch (error) {
          console.error('Failed to fetch events', error);
        }
      };
      fetchEvents();
    }
  }, [token]);

  return (
    <div>
      {/* <h2>Google Calendar Integration</h2> */}
      {!token ? (
        <button onClick={() => login()}>Sign in with Google to View Calendar</button>
      ) : (
        <div>
          <h3>Upcoming Events:</h3>
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <strong>{event.summary}</strong> — {event.start?.dateTime || event.start?.date}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GoogleCalendar;