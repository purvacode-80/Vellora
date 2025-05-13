// src/Components/GoogleLoginAuth.jsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function GoogleLoginAuth() {
  const navigate = useNavigate(); 

  const handleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Google user:', decoded);

      // Store the ID token and optionally the decoded info
      localStorage.setItem('token', credentialResponse.credential);
      localStorage.setItem('userEmail', decoded.email);
      localStorage.setItem('userName', decoded.name);

      navigate('/dashboard'); // Redirect after login
    } catch (error) {
      console.error('Failed to decode Google token:', error);
    }
  };

  const handleError = () => {
    console.error('Login Failed by Google...');
  };

  return (
    <div>
      <h3>Login with Google</h3>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap auto_select={false} />
    </div>
  );
}

export default GoogleLoginAuth;