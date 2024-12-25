import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaGithub } from 'react-icons/fa';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleGoogleLogin = async () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const handleGithubLogin = async () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Regular registration logic
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
            <h1 className="text-center mb-5">Create Account</h1>
            <div className="bg-light rounded p-4 p-sm-5">
              {/* Social Login Buttons */}
              <div className="d-grid gap-2 mb-4">
                <button 
                  className="btn btn-danger py-3 d-flex align-items-center justify-content-center gap-2"
                  onClick={handleGoogleLogin}
                >
                  <FaGoogle /> Continue with Google
                </button>
                <button 
                  className="btn btn-dark py-3 d-flex align-items-center justify-content-center gap-2"
                  onClick={handleGithubLogin}
                >
                  <FaGithub /> Continue with GitHub
                </button>
              </div>

              <div className="text-center mb-4">
                <span className="bg-light px-2">OR</span>
                <hr className="mt-n3" />
              </div>

              {/* Regular Registration Form */}
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control border-0"
                    id="name"
                    placeholder="Full Name"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <label htmlFor="name">Full Name</label>
                </div>
                {/* ... existing form fields ... */}
                <button className="btn btn-primary py-3 w-100 mb-4" type="submit">
                  Sign Up
                </button>
                <p className="text-center mb-0">
                  Already have an Account? <Link to="/login">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;