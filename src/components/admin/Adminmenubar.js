import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./Adminmenubar.css";
import { Button } from "react-bootstrap";

function Adminmenubar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token or session data
    navigate("/"); // Redirect to the login page
  };

  return (
    <div>
      <div className="header">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className={`d-flex`}>
        {/* Sidebar */}
        <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
          <Button variant="primary" onClick={toggleNavbar}>
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/reports" className="nav-link">Reports</Link>
            </li>
            <li className="nav-item">
              <Link to="/settings" className="nav-link">Settings</Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className={`main-content ${isExpanded ? "shrink" : "full"}`}>
          <div className="content">
            <h1>Welcome to Admin Dashboard</h1>
            <p>Main content goes here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminmenubar;
