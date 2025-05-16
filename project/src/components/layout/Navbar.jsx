import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            <span className="logo-text">PBScheduleee</span>
          </Link>

          <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span className="hamburger"></span>
          </button>

          <div className={`navbar-menu ${menuOpen ? 'is-active' : ''}`}>
            {isAuthenticated ? (
              <>
                <div className="navbar-start">
                  <Link to="/dashboard" className="navbar-item" onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/calendar" className="navbar-item" onClick={() => setMenuOpen(false)}>
                    Calendar
                  </Link>
                  <Link to="/tasks/new" className="navbar-item" onClick={() => setMenuOpen(false)}>
                    Add Task
                  </Link>
                </div>
                <div className="navbar-end">
                  <span className="navbar-item user-name">
                    Welcome, {user?.name}
                  </span>
                  <button 
                    className="btn btn-outline navbar-item"
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="navbar-end">
                <Link to="/login" className="navbar-item" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn navbar-item" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;