import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <Link to="/" className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-3">
          <img 
            src="assets/img/logo.png" 
            alt="Logo" 
            style={{ width: '250px', height: 'auto' }}  // Adjust the width as needed
          />
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="/" className="nav-item nav-link">Home</Link>
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Jobs</a>
              <div className="dropdown-menu rounded-0 m-0">
                <Link to="/job-list" className="dropdown-item">Job List</Link>
                <Link to="/job-category" className="dropdown-item">Job Detail</Link>
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
                  <Link to="/user-panel" className="dropdown-item">Dashboard</Link>
                  <a 
                    href="#" 
                    className="dropdown-item"
                    onClick={() => {
                      localStorage.removeItem('jwtToken');
                      setIsLoggedIn(false);
                    }}
                  >
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">
                Sign In<i className="fa fa-arrow-right ms-3"></i>
              </Link>
            )}
          </div>
          {isLoggedIn && (
            <Link 
              to="/post-job" 
              className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"
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
