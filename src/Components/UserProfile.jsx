import React, { useEffect, useState } from 'react';
import '../css/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    profileImage: '',
  });

  useEffect(() => {
    fetch('/api/user/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        alert('Profile updated successfully!');
        setUser(data);
      });
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>
        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          value={user.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          type="number"
          name="phone"
          value={user.phone}
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <input
          type="text"
          value={user.role}
          placeholder="Role"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Update Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
