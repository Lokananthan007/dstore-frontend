import React, { useState } from "react";
import "./Adminmenubar.css";
import { Button } from "react-bootstrap";

function Adminmenubar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
    <div className={`d-flex`}>
      {/* Sidebar */}
      <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <Button variant="primary" onClick={toggleNavbar}>
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a to='' className="nav-link">Dashboard</a>
          </li>
          <li className="nav-item">
            <a to='' className="nav-link">Reports</a>
          </li>
          <li className="nav-item">
            <a to='' className="nav-link">Settings</a>
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
    </>
  );
}

export default Adminmenubar;
