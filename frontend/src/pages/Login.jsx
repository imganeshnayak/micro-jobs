// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Login.css";
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { auth, googleProvider, signInWithPopup } from "../firebase.js";



// const Login3D = () => {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     userType: "worker",
    
//   });
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// console.log(API_BASE_URL)
//   const navigate = useNavigate();

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleRegister = async (event) => {
//     event.preventDefault();
//     const { fullName, email, password, userType } = formData;

//     if (!fullName || !email || !password) {
//       toast.error("All fields are required");
//       return;
//     }

//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters long");
//       return;
//     }

//     try {
//       const response = await axios.post(`${API_BASE_URL}/register`, {
//         fullName,
//         email,
//         password,
//         userType,
//       });
//       toast.success(response.data.message);
//       setIsFlipped(false);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed");
//     }
//   };

// const handleGoogleLogin = async () => {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     const token = await result.user.getIdToken(); // Get Firebase Token

//     // Send token to backend
//     const response = await axios.post(`${API_BASE_URL}/firebase-login`, { token });
//     handleLoginSuccess(response.data);
//   } catch (error) {
//     console.error("Google login failed:", error);
//     toast.error("Google login failed. Please try again.");
//   }
// };

//   const handleLoginSuccess = (data) => {
//     localStorage.setItem('jwtToken', data.token);
//     localStorage.setItem('user', JSON.stringify(data.user));
//     localStorage.setItem('data', JSON.stringify(data));
//     console.log(data)

//     const { state } = location;
//     if (state?.returnUrl) {
//       navigate(state.returnUrl);
//     } else {
//       navigate('/');
//     }
//   };

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     const { email, password } = formData;

//     if (!email || !password) {
//       toast.error("Please enter both email and password");
//       return;
//     }

//     try {
//       const response = await axios.post("${API_BASE_URL}/login", {
//         email,
//         password,
//       });

//       // Log the response data to inspect the successful response structure
//       console.log('Login response:', response);

//       const token = response.data.token;

//       // Set cookie
//       Cookies.set('token', token, { expires: 1 });
//       toast.success('Login successful');

//       // Call the success handler
//       handleLoginSuccess({ token, user: response.data.user });

//     } catch (error) {
//       // Log the error to understand why the login failed
//       console.error('Login error:', error.response || error);
//       toast.error(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="scene">
//       <ToastContainer />
//       {/* Left side: Animated GIF */}
//       <div className="left-side">
//         <img
//           src="https://res.cloudinary.com/dahotkqpi/image/upload/v1738249853/6325230_k7llop.jpg"
//           alt="Animated Graphic"
//         />
//       </div>

//       {/* Right side: Login/Register Form */}
//       <div className="right-side">
//         <div className={`container3d ${isFlipped ? "flipped" : ""}`}>
//           {/* Login Side */}
//           <div className="card3d login-side">
//             <div className="content">
//               <h2 className="title">Welcome to DooQ</h2>
//               <p className="subtitle">Connect with skilled workers & opportunities</p>
//               <form className="form3d" onSubmit={handleLogin}>
//                 <div className="input-group3d">
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     value={formData.email}
//                     onChange={handleInputChange}
//                   />
//                   <span>Email Address</span>
//                 </div>
//                 <div className="input-group3d">
//                   <input
//                     type="password"
//                     name="password"
//                     required
//                     value={formData.password}
//                     onChange={handleInputChange}
//                   />
//                   <span>Password</span>
//                 </div>
//                 <div className="links">
//                   <a href="#">Forgot Password?</a>
//                   <a
//                     href="#"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       setIsFlipped(true);
//                     }}
//                   >
//                     Create Account
//                   </a>
//                 </div>
//                 <button type="submit" className="btn3d">Login</button>
//               </form>
//             </div>
//           </div>

//           {/* Register Side */}
//           <div className="card3d register-side">
//             <div className="content">
//               <h2 className="title">Join DooQ</h2>
//               <p className="subtitle">Start your micro-job journey today</p>
//               <form className="form3d" onSubmit={handleRegister}>
//                 <div className="input-group3d">
//                   <input
//                     type="text"
//                     name="fullName"
//                     required
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                   />
//                   <span>Full Name</span>
//                 </div>
//                 <div className="input-group3d">
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     value={formData.email}
//                     onChange={handleInputChange}
//                   />
//                   <span>Email Address</span>
//                 </div>
//                 <div className="input-group3d">
//                   <input
//                     type="password"
//                     name="password"
//                     required
//                     value={formData.password}
//                     onChange={handleInputChange}
//                   />
//                   <span>Password</span>
//                 </div>
//                 <div className="user-type">
//                   <label>
//                     <input
//                       type="radio"
//                       name="userType"
//                       value="worker"
//                       checked={formData.userType === "worker"}
//                       onChange={handleInputChange}
//                     />
//                     <span>I'm a Worker</span>
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="userType"
//                       value="hirer"
//                       checked={formData.userType === "hirer"}
//                       onChange={handleInputChange}
//                     />
//                     <span>I'm a Hirer</span>
//                   </label>
//                 </div>
//                 <div className="links">
//                   <a href="#">Terms & Conditions</a>
//                   <a
//                     href="#"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       setIsFlipped(false);
//                     }}
//                   >
//                     Sign In Instead
//                   </a>
//                 </div>
//                 <button onClick={handleGoogleLogin} className="btn3d google-btn">
//   Sign in with Google
// </button>

//                 <button type="submit" className="btn3d">Register</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login3D;
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { auth, googleProvider, signInWithPopup } from "../firebase.js";

const Login3D = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    userType: "worker",
  });

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log(API_BASE_URL); // Ensure this logs the correct value
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
      const response = await axios.post(`${API_BASE_URL}/register`, {
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

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      const response = await axios.post(`${API_BASE_URL}/firebase-login`, { token });
      handleLoginSuccess(response.data);
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleLoginSuccess = (data) => {
    localStorage.setItem('jwtToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('data', JSON.stringify(data));
    console.log(data);

    navigate('/'); // Navigate to the home page
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      console.log('Login response:', response);

      const token = response.data.token;
      Cookies.set('token', token, { expires: 1 });
      toast.success('Login successful');

      handleLoginSuccess({ token, user: response.data.user });
    } catch (error) {
      console.error('Login error:', error.response || error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="scene">
      <ToastContainer />
      <div className="left-side">
        <img
          src="https://res.cloudinary.com/dahotkqpi/image/upload/v1738249853/6325230_k7llop.jpg"
          alt="Animated Graphic"
        />
      </div>

      <div className="right-side">
        <div className={`container3d ${isFlipped ? "flipped" : ""}`}>
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
                <button onClick={handleGoogleLogin} className="btn3d google-btn">
                  Sign in with Google
                </button>
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