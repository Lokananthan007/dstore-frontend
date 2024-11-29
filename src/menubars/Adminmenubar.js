import "../menubars/Adminmenubar.css";
import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { FaTachometerAlt , FaUsers,  FaShippingFast,  FaEdit} from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";
import Logo from '../components/images/logo.jpg';

function Adminmenubar() {
    const [activeLink, setActiveLink] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
      setActiveLink(location.pathname);
    }, [location]);
  
    const token = localStorage.getItem('token');
  
    if (!token || location.pathname === '/') {
      return null; 
    }
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/');
    };


  return (
    <div>
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
              to="/dashboard"
              className={activeLink === '/dashboard' ? 'active' : ''}
              onClick={() => setActiveLink('/dashboard')}
            >
              <FaTachometerAlt  />
              <span className="link-text">Dashboard</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/dashboard/order"
              className={activeLink === '/dashboard/order' ? 'active' : ''}
              onClick={() => setActiveLink('/dashboard/order')}
            >
              <FaShippingFast />
              <span className="link-text">Order Detailes</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/dashboard/empmanagement"
              className={activeLink === '/dashboard/empmanagement' ? 'active' : ''}
              onClick={() => setActiveLink('/dashboard/empmanagement')}
            >
              <FaUsers />
              <span className="link-text">Emp Management</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/dashboard/empattendance"
              className={activeLink === '/dashboard/empattendance' ? 'active' : ''}
              onClick={() => setActiveLink('/dashboard/empattendance')}
            >
              < FaEdit   />
              <span className="link-text">Emp Attendance</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/dashboard/empdetails"
              className={activeLink === '/dashboard/empdetails' ? 'active' : ''}
              onClick={() => setActiveLink('/dashboard/empdetails')}
            >
              <IoPersonAddOutline />
              <span className="link-text">Emp Detailes</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
    </div>
  );
}

export default Adminmenubar;
