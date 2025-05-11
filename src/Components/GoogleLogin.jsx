import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function GoogleLoginAuth() {
  const navigate = useNavigate(); 

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Google user : ', decoded);

    // You can now store user or token in context/localStorage
    localStorage.setItem('token', credentialResponse.credential);
    navigate('/dashboard'); // Redirect to dashboard
  };

  const handleError = () => {
    console.error('Login Failed by Google...');
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}

export default GoogleLoginAuth;
