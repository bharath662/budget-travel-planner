import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accommodationOptions, foodOptions } from '../data/travelData';
import './TravelForm.css';

function Accommodation({ tripData, setTripData }) {
  const [formData, setFormData] = useState({
    hotelRating: tripData.accommodation?.hotelRating || '',
    foodType: tripData.accommodation?.foodType || ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.hotelRating || !formData.foodType) {
      setError('Please select accommodation and food preferences');
      return;
    }

    setTripData({
      ...tripData,
      accommodation: formData
    });

    navigate('/budget-estimation');
  };

  const handleBack = () => {
    navigate('/transportation');
  };

  return (
    <div className="travel-form-container">
      <div className="travel-form-card">
        <div className="form-header">
          <h2>Step 7: Accommodation & Food</h2>
          <p>Choose your stay and food preferences</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="travel-form">
          <div className="form-section">
            <h3>Hotel Rating</h3>
            <div className="accommodation-grid">
              {accommodationOptions.map(option => (
                <div
                  key={option.rating}
                  className={`accommodation-card ${
                    formData.hotelRating === option.rating ? 'selected' : ''
                  }`}
                  onClick={() => setFormData({ ...formData, hotelRating: option.rating })}
                >
                  <h4>{option.rating}</h4>
                   
                  <div className="amenities">
                    {option.amenities.map(amenity => (
                      <span key={amenity} className="amenity-tag">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  {formData.hotelRating === option.rating && (
                    <span className="checkmark">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>Food Preference</h3>
            <div className="food-grid">
              {foodOptions.map(option => (
                <div
                  key={option.type}
                  className={`food-card ${
                    formData.foodType === option.type ? 'selected' : ''
                  }`}
                  onClick={() => setFormData({ ...formData, foodType: option.type })}
                >
                  <h4>
                    {option.type === 'Veg' && '🥗'}
                    {option.type === 'Non-Veg' && '🍗'}
                    {option.type === 'Both' && '🍽️'}
                    {' '}{option.type}
                  </h4>
                   
                  {formData.foodType === option.type && (
                    <span className="checkmark">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleBack} className="btn-secondary">
              Back
            </button>
            <button type="submit" className="btn-primary">
              Calculate Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Accommodation;
