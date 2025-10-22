import { useEffect, useState } from 'react';
import './TravelForm.css';

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    setFeedbacks(storedFeedbacks.reverse()); // show latest first
  }, []);

  return (
    <div className="travel-form-container">
      <div className="travel-form-card">
        <div className="form-header">
          <h2>User Feedbacks</h2>
          <p>Read what users say about their trip planning experience</p>
        </div>

        {feedbacks.length === 0 ? (
          <p>No feedback submitted yet.</p>
        ) : (
          <div className="feedback-list">
            {feedbacks.map((fb, index) => (
              <div key={index} className="feedback-item">
                <p className="feedback-text">"{fb.text}"</p>
                <p className="feedback-meta">
                  — <strong>{fb.user}</strong> ({fb.tripName || 'No trip info'})<br />
                  <small>{fb.date}</small>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackList;
