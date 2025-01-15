import './EmpRegister.css';
import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function EmpRegister() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'employee', // Default role
    });

    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);
            setMessage(response.data.message);
            setIsError(false); // Success message
            setFormData({
                username: '',
                password: '',
                role: 'employee',
            }); // Clear form
        } catch (error) {
            setMessage(error.response?.data?.message || "Error occurred during registration.");
            setIsError(true); // Error message
        }
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="empregister">
            <div className="empregister-wrapper">
                <h1>Employee Registration</h1>
                <form className="empregister-form" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label>Employee Name</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <label>Password</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <span className="toggle-password" onClick={toggleShowPassword}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="employee">Employee</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-button">Register</button>
                </form>
                {message && (
                    <p className={`message ${isError ? 'error' : 'success'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default EmpRegister;
