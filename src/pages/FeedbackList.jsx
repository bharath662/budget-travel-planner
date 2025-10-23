import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';
import './TravelForm.css';

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/feedbacks`);
        const data = await res.json();
        setFeedbacks(data.reverse());
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  if (loading) return <p>Loading feedbacks...</p>;

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
                <p className="feedback-text">"{fb.feedback}"</p>
                <p className="feedback-meta">
                  — <strong>{fb.name}</strong><br />
                  <small>{new Date(fb.createdAt).toLocaleString()}</small>
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
