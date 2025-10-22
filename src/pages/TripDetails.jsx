import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TravelForm.css';

function TripDetails({ tripData, setTripData }) {
  const [formData, setFormData] = useState({
    adults: tripData.adults || 1,
    children: tripData.children || 0
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setFormData({
      ...formData,
      [e.target.name]: value >= 0 ? value : 0
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.adults === 0) {
      setError('At least one adult is required');
      return;
    }

    setTripData({
      ...tripData,
      adults: formData.adults,
      children: formData.children
    });

    navigate('/transportation');
  };

  const handleBack = () => {
    navigate('/select-places');
  };

  return (
    <div className="travel-form-container">
      <div className="travel-form-card">
        <div className="form-header">
          <h2>Step 5: Trip Details</h2>
          <p>Tell us how many people are traveling</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="travel-form">
          <div className="form-group">
            <label htmlFor="adults">Number of Adults</label>
            <input
              type="number"
              id="adults"
              name="adults"
              value={formData.adults}
              onChange={handleChange}
              className="form-input"
              min="1"
              max="20"
            />
            <small className="form-help">Age 18 and above</small>
          </div>

          <div className="form-group">
            <label htmlFor="children">Number of Children</label>
            <input
              type="number"
              id="children"
              name="children"
              value={formData.children}
              onChange={handleChange}
              className="form-input"
              min="0"
              max="20"
            />
            <small className="form-help">Age below 18</small>
          </div>

          <div className="travelers-summary">
            <h3>Total Travelers: {formData.adults + formData.children}</h3>
            <p>{formData.adults} Adult(s) + {formData.children} Children</p>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleBack} className="btn-secondary">
              Back
            </button>
            <button type="submit" className="btn-primary">
              Next: Transportation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TripDetails;
