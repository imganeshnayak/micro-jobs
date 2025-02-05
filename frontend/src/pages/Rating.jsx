import React, { useState } from "react";
import axios from "axios";

const Rating = ({ userId }) => { // Ensure userId is passed as a prop
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate rating (1 to 5)
    if (rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5");
      return;
    }

    try {
      const raterId = JSON.parse(localStorage.getItem("user"))._id; // Logged-in user ID (rater)
      console.log("Submitting rating for user ID:", userId); // Debugging
      console.log("Rater ID:", raterId); // Debugging

      if (!userId) {
        throw new Error("User ID is undefined");
      }

      const response = await axios.post(`${API_BASE_URL}/user/${userId}/rate`, {
        rating,
        raterId,
      });

      console.log("Rating submitted successfully:", response.data); // Debugging
      alert("Rating submitted successfully!");
    } catch (error) {
      console.error("Error submitting rating:", error);
      setError("Failed to submit rating. Please try again later.");
    }
  };

  return (
    <div className="rating-container">
      <h2>Rate this User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit Rating
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Rating;