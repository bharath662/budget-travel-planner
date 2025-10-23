import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import './TravelForm.css';

function FeedbackForm() {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post(`${API_BASE_URL}/feedback`, { name, feedback });

      setSuccess('Thank you for your feedback!');
      setName('');
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="travel-form-container">
      <div className="travel-form-card">
        <div className="form-header">
          <h2>Submit Your Feedback</h2>
          <p>We value your opinion!</p>
        </div>

        <form onSubmit={handleSubmit} className="travel-form">
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Your Feedback</label>
            <textarea
              className="form-input"
              rows="4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-primary">Submit</button>
          {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
