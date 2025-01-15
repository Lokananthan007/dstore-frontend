import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    // Ensure user has the correct role
    if (!token || userRole !== requiredRole) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
