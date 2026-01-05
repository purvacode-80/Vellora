// src/Components/GoogleLoginAuth.jsx
import React from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function GoogleLoginAuth() {
  const navigate = useNavigate(); 

  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Google user:', decoded);

      // Store the ID token and optionally the decoded info
      localStorage.setItem('token', credentialResponse.credential);
      const userEmail = decoded.email;
      // localStorage.setItem('userName', decoded.name);

      // Check with backend if user exists
      const response = await axios.post('http://localhost:8000/users/userexists', { userEmail });

      if (response.data.exists) {
        navigate('/dashboard');
      } else {
        navigate('/register', { state: { fromGoogle: true, userEmail } });
      }
    } catch (error) {
      console.error('Failed to decode Google token:', error);
    }
  };

  const handleError = () => {
    console.error('Login Failed by Google...');
  };

  return (
    <div>
      <h5> OR </h5>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap auto_select={false} />
    </div>
  );
}

export default GoogleLoginAuth;