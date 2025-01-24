import './Sidemenubar.css';
import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import Logo from '../../assets/images/dechro logo.png';
import { FaRegClipboard ,  FaListAlt ,FaCartArrowDown} from "react-icons/fa";
import { GrDocumentUpdate } from "react-icons/gr";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";

function Empsidebar() {
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
              to="/employee/order-details"
              className={activeLink === '/employee/order-details' ? 'active' : ''}
              onClick={() => setActiveLink('/employee/order-details')}
            >
              <FaRegClipboard  />
              <span className="link-text">Order Register</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/employee/order/total-order"
              className={activeLink === '/employee/order/total-order' ? 'active' : ''}
              onClick={() => setActiveLink('/employee/order/total-order')}
            >
              <FaListAlt />
              <span className="link-text">Total Orders</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/employee/order/order-taken"
              className={activeLink === '/employee/order/order-taken' ? 'active' : ''}
              onClick={() => setActiveLink('/employee/order/order-taken')}
            >
              <FaCartArrowDown />
              <span className="link-text">Orders Taken</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/employee/order/total-update"
              className={activeLink === '/employee/order/total-update' ? 'active' : ''}
              onClick={() => setActiveLink('/employee/order/total-update')}
            >
              <GrDocumentUpdate  />
              <span className="link-text">Update States</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
}

export default Empsidebar;