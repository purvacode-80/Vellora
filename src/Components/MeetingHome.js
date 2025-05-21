// src/components/MeetingHome.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Meeting.css';

const MeetingHome = () => {
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (roomName.trim() !== '' && userName.trim() !== '') {
      navigate(`/meeting/${roomName}?name=${encodeURIComponent(userName)}`);
    } else {
      alert('Please enter both your name and the meeting name.');
    }
  };

  return (
    <div className="meeting-home">
      <div className="meeting-card animated">
        <h1 className="title">CRM Meet</h1>
        <p className="subtitle">Secure video meetings for your CRM workspace</p>
        <input
          className="input"
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Enter meeting name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button className="start-button" onClick={handleStart}>Start Meeting</button>
      </div>
    </div>
  );
};

export default MeetingHome;
