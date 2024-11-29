import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful!');
      window.location.href = '/dashboard'; 
    } catch (err) {
      setMessage(err.response.data.message || 'Error logging in');
    }
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-field">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {message && <p style={{color:"red"}}>{message}</p>}
      </div>
    </div>
  );
}

export default Login;
