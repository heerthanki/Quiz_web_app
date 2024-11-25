import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
import './loginpanel.css';

const LoginPanel = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Use context to set user info globally

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      if (response.data.success) {
        // Update UserContext with user details
        setUser({
          username: response.data.username,
          userType: response.data.userType,
        });

        // Navigate based on user type
        if (response.data.userType === 'teacher') {
          navigate('/adminpanel');
        } else if (response.data.userType === 'student') {
          navigate('/studentpanel/dashboard');
        } else {
          setErrorMessage('Invalid user type');
        }
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Failed to log in. Please try again.');
    }
  };

  return (
    <div className="login-panel">
      <h2>Login Panel</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
};

export default LoginPanel;
