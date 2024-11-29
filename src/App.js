import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import { Navigate } from 'react-router-dom';
import './App.css';
import Adminmenubar from './menubars/Adminmenubar';
import Admindashboard from './components/admin/Admindashbord';
import Order from './components/admin/order/Order';
import Empmanagement from './components/admin/empdetails/Empmanagement';
import Empdetails from './components/admin/empdetails/Empdetails';
import Empattendance from './components/admin/empdetails/Empattendance';

function App() {
  return (
    <Router>
      <div className="App">
        <Adminmenubar/>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Admindashboard/>
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/order"
              element={
                <PrivateRoute>
                  <Order/>
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/empmanagement"
              element={
                <PrivateRoute>
                  <Empmanagement/>
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/empdetails"
              element={
                <PrivateRoute>
                  <Empdetails/>
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/empattendance"
              element={
                <PrivateRoute>
                  <Empattendance/>
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;