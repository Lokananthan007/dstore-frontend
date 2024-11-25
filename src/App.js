import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Adminmenubar from './components/admin/Adminmenubar';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route both `/` and `/login` to the Login component */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard with PrivateRoute */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Adminmenubar />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
