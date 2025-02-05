// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./UserDetails.css"; // Import custom styles

// const UserDetails = () => {
//   const [user, setUser] = useState({
//     phone: "",
//     address: "",
//     pincode: "",
//     profilePicture: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const userId = JSON.parse(localStorage.getItem("user"))._id;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
//         setUser(response.data);
//         setPreview(response.data.profilePicture); // Set existing profile picture as preview
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//         setError("Failed to fetch user details. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [userId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file)); // Show image preview
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate phone number and pincode
//     if (!/^\d{10}$/.test(user.phone)) {
//       alert("Phone number must be 10 digits");
//       return;
//     }
//     if (!/^\d{6}$/.test(user.pincode)) {
//       alert("Pincode must be 6 digits");
//       return;
//     }

//     let profileImageUrl = user.profilePicture; // Default to existing profile picture

//     // Upload new image if selected
//     if (image) {
//       const formData = new FormData();
//       formData.append("file", image); // Append the file to FormData

//       try {
//         const uploadResponse = await axios.post(
//           "${API_BASE_URL}/upload", // Your backend upload endpoint
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data", // Set content type for file upload
//             },
//           }
//         );

//         profileImageUrl = uploadResponse.data.imageUrl; // Get the uploaded image URL from the response
//       } catch (error) {
//         console.error("Error uploading image:", error);
//         alert("Failed to upload image. Please try again.");
//         return;
//       }
//     }

//     // Update user details with the new profile picture URL
//     try {
//       await axios.put(`${API_BASE_URL}/user/${userId}`, {
//         ...user,
//         profilePicture: profileImageUrl,
//       });
//       alert("User details updated successfully!");
//     } catch (error) {
//       console.error("Error updating user details:", error);
//       alert("Failed to update user details. Please try again later.");
//     }
//   };

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error-message">{error}</div>;

//   return (
//     <div className="user-details-container">
//       <div className="form-card">
//         <h2 className="form-title">Update Your Details</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Phone Number</label>
//             <input
//               type="text"
//               name="phone"
//               value={user.phone}
//               onChange={handleInputChange}
//               placeholder="Enter 10-digit phone number"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Address</label>
//             <textarea
//               name="address"
//               value={user.address}
//               onChange={handleInputChange}
//               placeholder="Enter your address"
//               rows="3"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Pincode</label>
//             <input
//               type="text"
//               name="pincode"
//               value={user.pincode}
//               onChange={handleInputChange}
//               placeholder="Enter 6-digit pincode"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Profile Picture</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               required
//             />
//             {preview && (
//               <img
//                 src={preview}
//                 alt="Profile Preview"
//                 className="profile-preview"
//               />
//             )}
//           </div>
//           <button type="submit" className="submit-button">
//             Update Details
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserDetails;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./UserDetails.css"; // Import custom styles
import Footer from "../components/Footer";

const UserDetails = () => {
  const [user, setUser] = useState({
    phone: "",
    address: "",
    pincode: "",
    upiId: "",
    profilePicture: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const userId = JSON.parse(localStorage.getItem("user"))._id;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
        setUser(response.data);
        setPreview(response.data.profilePicture); // Set existing profile picture as preview
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show image preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number and pincode
    if (!/^\d{10}$/.test(user.phone)) {
      alert("Phone number must be 10 digits");
      return;
    }
    if (!/^\d{6}$/.test(user.pincode)) {
      alert("Pincode must be 6 digits");
      return;
    }
    if (user.upiId && !/^[\w.-]+@[\w.-]+$/.test(user.upiId)) {
      alert("Enter a valid UPI ID (e.g., example@upi)");
      return;
    }

    let profileImageUrl = user.profilePicture; // Default to existing profile picture

    // Upload new image if selected
    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      try {
        const uploadResponse = await axios.post(
          `${API_BASE_URL}/upload`, // Your backend upload endpoint
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        profileImageUrl = uploadResponse.data.imageUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
        return;
      }
    }

    // Update user details with the new profile picture URL
    try {
      await axios.put(`${API_BASE_URL}/user/${userId}`, {
        ...user,
        profilePicture: profileImageUrl,
      });
      alert("User details updated successfully!");
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Failed to update user details. Please try again later.");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="container-xxl p-0">
        <Navbar />
    <div className="user-details-container">
      <div className="form-card">
        <h2 className="form-title">Update Your Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              placeholder="Enter 10-digit phone number"
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={user.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              rows="3"
              required
            />
          </div>
          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              name="pincode"
              value={user.pincode}
              onChange={handleInputChange}
              placeholder="Enter 6-digit pincode"
              required
            />
          </div>
          <div className="form-group">
            <label>UPI ID</label>
            <input
              type="text"
              name="upiId"
              value={user.upiId}
              onChange={handleInputChange}
              placeholder="example@upi"
            />
          </div>
          <div className="form-group">
            <label>Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Profile Preview"
                className="profile-preview"
              />
            )}
          </div>
          <button type="submit" className="submit-button">
            Update Details
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default UserDetails;
