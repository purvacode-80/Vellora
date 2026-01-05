// src/Components/CreateCalendarEvent.jsx
import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const CreateCalendarEvent = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [form, setForm] = useState({
    summary: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.events',
    onSuccess: (tokenResponse) => setToken(tokenResponse.access_token),
    onError: () => console.error('Login Failed'),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createEvent = async () => {
    const event = {
      summary: form.summary,
      description: form.description,
      start: {
        dateTime: `${form.startDate}T${form.startTime}:00`,
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: `${form.endDate}T${form.endTime}:00`,
        timeZone: 'Asia/Kolkata',
      },
    };

    try {
      const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      const data = await res.json();
      console.log('Event Created:', data);
      alert('Event successfully created!');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Create Google Calendar Event</h2>

      {!token ? (
        <button onClick={() => login()}>Sign in with Google</button>
      ) : (
        <div>
          <input
            type="text"
            name="summary"
            placeholder="Event Title"
            value={form.summary}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <label>Start Date and Time</label>
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
          <input type="time" name="startTime" value={form.startTime} onChange={handleChange} /><br />

          <label>End Date and Time</label>
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
          <input type="time" name="endTime" value={form.endTime} onChange={handleChange} /><br />

          <button onClick={createEvent} style={{ marginTop: '10px' }}>Create Event</button>
        </div>
      )}
    </div>
  );
};

export default CreateCalendarEvent;