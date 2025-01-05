import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        {/* Logo */}
        <Link 
          to="/" 
          className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-0"
        >
          <img 
            src="assets/img/logo.png" 
            alt="Logo" 
            style={{ 
              width: '150px', // Default width
              height: 'auto', 
              maxWidth: '100%' // Responsive scaling for smaller screens
            }} 
            className="img-fluid" // Ensures responsiveness
          />
        </Link>

        {/* Navbar Toggle Button */}
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="/" className="nav-item nav-link">Home</Link>
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Jobs</a>
              <div className="dropdown-menu rounded-0 m-0">
                <Link to="/job-list" className="dropdown-item">Job List</Link>
                <Link to="/job-category" className="dropdown-item">Categories</Link>
              </div>
            </div>
            {isLoggedIn ? (
              <div className="nav-item dropdown">
                <a 
                  href="#" 
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <FaUser className="me-2" />
                  Account
                </a>
                <div className="dropdown-menu rounded-0 m-0">
                  <Link to="/user-panel" className="dropdown-item">Dashboard</Link> {/* Link to Dashboard */}
                  <a 
                    href="#" 
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary rounded-0 py-4 px-4 ms-2">
                Sign In<i className="fa fa-arrow-right ms-3"></i>
              </Link>
            )}
          </div>
          {isLoggedIn && (
            <Link 
              to="/post-job" 
              className="btn btn-primary rounded-0 py-4 px-4 ms-2"
            >
              Post A Job<i className="fa fa-arrow-right ms-3"></i>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
