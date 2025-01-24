import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Adminsidebar from './components/sidebars/Adminsidebar';
import Empsidebar from './components/sidebars/Empsidebar';
import Login from './login/Login';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/admin/Dashboard';
import Orders from './components/admin/Orders';
import OrderRegister from './components/empolyee/OrderRegister';
import TotalOrders from './components/empolyee/TotalOrders';
import './App.css';
import EmpRegister from './components/admin/EmpRegister';
import OrderUpdate from './components/empolyee/OrderUpdate';
import OrderTacken from './components/empolyee/OrderTacken';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                {/* Admin routes */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <Adminsidebar />
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/dashboard/orders"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <Adminsidebar />
                            <Orders />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/dashboard/employeeRegister"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <Adminsidebar />
                            <EmpRegister/>
                        </PrivateRoute>
                    }
                />
                {/* Employee routes */}
                <Route
                    path="/employee/order-details"
                    element={
                        <PrivateRoute requiredRole="employee">
                            <Empsidebar />
                            <OrderRegister />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/employee/order/total-order"
                    element={
                        <PrivateRoute requiredRole="employee">
                            <Empsidebar />
                            <TotalOrders />
                        </PrivateRoute>
                    }
                />
                    <Route
                        path="/employee/order/order-taken"
                        element={
                            <PrivateRoute requiredRole="employee">
                                <Empsidebar />
                                <OrderTacken/>
                            </PrivateRoute>
                        }
                    />
                <Route
                    path="/employee/order/total-update"
                    element={
                        <PrivateRoute requiredRole="employee">
                            <Empsidebar />
                            <OrderUpdate/>
                        </PrivateRoute>
                    }
                />
                {/* Redirect unknown routes to login */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
