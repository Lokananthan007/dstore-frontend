import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login">
      <div className="login-wrapper">
        <h2>Login</h2>
        <form className="login-form">
          <div className="input-field">
            <input
              type="text"
              required
            />
            <label>Username</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              required
            />
            <label>Password</label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
