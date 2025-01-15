import './Sidemenubar.css';
import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import Logo from '../../assets/images/D-store.png';
import { MdDashboard } from 'react-icons/md';
import { RiShoppingCartFill } from "react-icons/ri";
import { FaUserTie } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";

function Adminsidebar() {
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const token = localStorage.getItem('token');

  if (!token || location.pathname === '/') {
    return null; // Don't show sidebar on login page
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <div className='header'>
        <img src={Logo} alt='logo' />
        <button onClick={handleLogout}><LuLogOut /> Logout</button>
      </div>
      <div className="side-menu">
        <Nav className="flex-column">
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/admin/dashboard"
              className={activeLink === '/admin/dashboard' ? 'active' : ''}
              onClick={() => setActiveLink('/admin/dashboard')}
            >
              <MdDashboard />
              <span className="link-text">Dashboard</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/admin/dashboard/orders"
              className={activeLink === '/admin/dashboard/orders' ? 'active' : ''}
              onClick={() => setActiveLink('/admin/dashboard/orders')}
            >
              <RiShoppingCartFill />
              <span className="link-text">Orders</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/admin/dashboard/employeeRegister"
              className={activeLink === '/admin/dashboard/employeeRegister' ? 'active' : ''}
              onClick={() => setActiveLink('/admin/dashboard/employeeRegister')}
            >
              <FaUserTie />
              <span className="link-text">EmployeeRegister</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
}

export default Adminsidebar;