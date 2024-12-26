import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const Login3D = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    userType: "worker",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const { fullName, email, password, userType } = formData;

    if (!fullName || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        fullName,
        email,
        password,
        userType,
      });
      toast.success(response.data.message);
      setIsFlipped(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login successful");
      
      // Redirect to user panel
      setTimeout(() => {
        navigate('/user-panel');
      }, 1500); // Delay to show success message
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="scene">
      <ToastContainer />
      {/* Left side: Animated GIF */}
      <div className="left-side">
        <img
          src="/assets/img/login.gif"
          alt="Animated Graphic"
        />
      </div>

      {/* Right side: Login/Register Form */}
      <div className="right-side">
        <div className={`container3d ${isFlipped ? "flipped" : ""}`}>
          {/* Login Side */}
          <div className="card3d login-side">
            <div className="content">
              <h2 className="title">Welcome to DooQ</h2>
              <p className="subtitle">Connect with skilled workers & opportunities</p>
              <form className="form3d" onSubmit={handleLogin}>
                <div className="input-group3d">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <span>Email Address</span>
                </div>
                <div className="input-group3d">
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <span>Password</span>
                </div>
                <div className="links">
                  <a href="#">Forgot Password?</a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsFlipped(true);
                    }}
                  >
                    Create Account
                  </a>
                </div>
                <button type="submit" className="btn3d">Login</button>
              </form>
            </div>
          </div>

          {/* Register Side */}
          <div className="card3d register-side">
            <div className="content">
              <h2 className="title">Join DooQ</h2>
              <p className="subtitle">Start your micro-job journey today</p>
              <form className="form3d" onSubmit={handleRegister}>
                <div className="input-group3d">
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                  <span>Full Name</span>
                </div>
                <div className="input-group3d">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <span>Email Address</span>
                </div>
                <div className="input-group3d">
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <span>Password</span>
                </div>
                <div className="user-type">
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="worker"
                      checked={formData.userType === "worker"}
                      onChange={handleInputChange}
                    />
                    <span>I'm a Worker</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="hirer"
                      checked={formData.userType === "hirer"}
                      onChange={handleInputChange}
                    />
                    <span>I'm a Hirer</span>
                  </label>
                </div>
                <div className="links">
                  <a href="#">Terms & Conditions</a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsFlipped(false);
                    }}
                  >
                    Sign In Instead
                  </a>
                </div>
                <button type="submit" className="btn3d">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login3D;
