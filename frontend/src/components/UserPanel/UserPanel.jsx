import React, { useState } from 'react';
import Navbar from '../Navbar';
import { FaUser, FaEnvelope, FaBriefcase, FaComment, FaEdit } from 'react-icons/fa';
import './UserPanel.css';

const UserPanel = () => {
  const [userType, setUserType] = useState('worker'); // Initially worker
  const [messages] = useState([
    { id: 1, from: 'John Doe', content: 'Looking for React Developer', type: 'hire' },
    { id: 2, from: 'Jane Smith', content: 'Frontend Project Available', type: 'hire' },
  ]);

  const [jobOffers] = useState([
    { id: 1, company: 'Tech Corp', role: 'Frontend Developer', salary: '$5000' },
    { id: 2, company: 'Dev Inc', role: 'UI Developer', salary: '$4500' },
  ]);

  const toggleUserType = () => {
    setUserType(userType === 'worker' ? 'hirer' : 'worker');
  };

  return (
    <div className="user-panel">
        <Navbar />
      <div className="profile-section">
        <div className="profile-header">
          <div className="profile-image">
            <img src="https://via.placeholder.com/150" alt="Profile" />
            <button className="edit-photo">
              <FaEdit />
            </button>
          </div>
          <div className="profile-info">
            <h2>Alex Johnson</h2>
            <p className="email"><FaEnvelope /> alex@example.com</p>
            <div className="user-type">
              <span className={`status ${userType}`}>
                <FaBriefcase /> {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </span>
              <button className="toggle-type" onClick={toggleUserType}>
                Switch to {userType === 'worker' ? 'Hirer' : 'Worker'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="panel-content">
        <div className="messages-section">
          <h3><FaComment /> Messages</h3>
          <div className="messages-list">
            {messages.map(message => (
              <div key={message.id} className="message-card">
                <div className="message-header">
                  <span className="from">{message.from}</span>
                  <span className={`type ${message.type}`}>
                    {message.type === 'hire' ? 'Hiring' : 'Work Offer'}
                  </span>
                </div>
                <p className="message-content">{message.content}</p>
                <div className="message-actions">
                  <button className="btn-respond">Respond</button>
                  <button className="btn-ignore">Ignore</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="offers-section">
          <h3><FaBriefcase /> Job Offers</h3>
          <div className="offers-list">
            {jobOffers.map(offer => (
              <div key={offer.id} className="offer-card">
                <h4>{offer.role}</h4>
                <p className="company">{offer.company}</p>
                <p className="salary">{offer.salary}</p>
                <button className="btn-apply">Apply Now</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;