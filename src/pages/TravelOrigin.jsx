import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TravelForm.css';

function TravelOrigin({ tripData, setTripData }) {
  const [formData, setFormData] = useState({
    origin: tripData.origin || '',
    startDate: tripData.startDate || '',
    endDate: tripData.endDate || ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const origins = [ 'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.origin || !formData.startDate || !formData.endDate) {
      setError('Please fill in all fields');
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError('End date must be after start date');
      return;
    }

    setTripData({
      ...tripData,
      origin: formData.origin,
      startDate: formData.startDate,
      endDate: formData.endDate
    });

    navigate('/select-states');
  };

  return (
    <div className="travel-form-container">
      <div className="travel-form-card">
        <div className="form-header">
          <h2>Step 1: Travel Details</h2>
          <p>Tell us where you're starting from and when you want to travel</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="travel-form">
          <div className="form-group">
            <label htmlFor="origin">Origin City</label>
            <select
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select your city</option>
              {origins.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="form-input"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="form-input"
                min={formData.startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Next: Select States
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TravelOrigin;
