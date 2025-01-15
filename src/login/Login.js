import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import './Login.css';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            const { token, role } = response.data;
    
            // Save the token and role to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
    
            // Redirect based on role
            if (role === 'admin') {
                navigate('/admin/dashboard');
            } else if (role === 'employee') {
                navigate('/employee/order-details');
            } else {
                alert('Unknown role');
            }
        } catch (error) {
            console.error(error);
            alert('Invalid username or password');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState); // Toggle password visibility state
    };
    
    return (
        <div className="login">
            <div className="login-wrapper">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label>Username</label>
                    </div>
                    <div className="input-field password-field">
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle input type based on state
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>Password</label>
                        <span
                            className="toggle-password"
                            onClick={togglePasswordVisibility} // Toggle visibility on click
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show/Hide icon */}
                        </span>
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
