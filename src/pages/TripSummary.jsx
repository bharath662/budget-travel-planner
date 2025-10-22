import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { packingSuggestions } from '../data/travelData';
import {
  indianStates,
  districtsData,
  touristPlaces,
  transportationOptions,
  accommodationOptions,
  foodOptions,
  calculateDistance
} from '../data/travelData';
import './TravelForm.css';

function TripSummary({ tripData, user }) {
  const navigate = useNavigate();

  // 🟢 Feedback state
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const getStateName = (stateId) =>
    indianStates.find((s) => s.id === stateId)?.name || '';

  const getDistrictName = (districtId) => {
    const allDistricts = Object.values(districtsData).flat();
    return allDistricts.find((d) => d.id === districtId)?.name || '';
  };

  const getPlaceName = (placeId) => {
    const allPlaces = Object.values(touristPlaces).flat();
    return allPlaces.find((p) => p.id === placeId)?.name || '';
  };

  const calculateTripCost = () => {
    if (!tripData.startDate || !tripData.endDate) return 0;

    const nights = Math.ceil(
      (new Date(tripData.endDate) - new Date(tripData.startDate)) /
        (1000 * 60 * 60 * 24)
    );

    const selectedStateNames = tripData.states.map((id) => getStateName(id));
    const distance = calculateDistance(tripData.origin, selectedStateNames);

    const transportOption = transportationOptions
      .find((t) => t.type === tripData.transportation?.type)
      ?.classes.find((c) => c.name === tripData.transportation?.class);

    const transportCost = transportOption
      ? (transportOption.basePrice +
          transportOption.pricePerKm * distance) *
        (tripData.adults + tripData.children * 0.5)
      : 0;

    const accommodation = accommodationOptions.find(
      (a) => a.rating === tripData.accommodation?.hotelRating
    );
    const accommodationCost = accommodation
      ? accommodation.pricePerNight *
        nights *
        Math.ceil((tripData.adults + tripData.children) / 2)
      : 0;

    const food = foodOptions.find(
      (f) => f.type === tripData.accommodation?.foodType
    );
    const foodCost = food
      ? food.pricePerDay * (nights + 1) * (tripData.adults + tripData.children)
      : 0;

    const miscCost = (transportCost + accommodationCost + foodCost) * 0.15;

    return Math.round(transportCost + accommodationCost + foodCost + miscCost);
  };

  const totalCost = calculateTripCost();

  const handleSaveTrip = () => {
    if (!user) {
      alert('Please login to save your trip');
      navigate('/login');
      return;
    }

    const savedTrips = JSON.parse(localStorage.getItem(`trips_${user.email}`) || '[]');

    const newTrip = {
      id: Date.now(),
      ...tripData,
      totalCost,
      createdAt: new Date().toISOString()
    };

    savedTrips.push(newTrip);
    localStorage.setItem(`trips_${user.email}`, JSON.stringify(savedTrips));

    alert('Trip saved successfully!');
    navigate('/saved-trips');
  };

  const handlePlanNewTrip = () => {
    navigate('/travel-origin');
  };

  // 🟢 Feedback handler
  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) return alert('Please write some feedback!');

    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    feedbacks.push({
      text: feedback,
      date: new Date().toLocaleString(),
      user: user ? user.name : 'Guest',
      tripName: tripData.states.map((id) => getStateName(id)).join(', ')
    });
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    setFeedback('');
    setFeedbackSubmitted(true);
    setTimeout(() => setFeedbackSubmitted(false), 3000);
  };

  // 🧳 Correctly get state names
  const selectedStateNames = tripData.states.map((id) => getStateName(id));

  return (
    <div className="travel-form-container">
      <div className="travel-form-card trip-summary-card">
        <div className="form-header">
          <h2>Trip Summary</h2>
          <p>Review your complete trip plan</p>
        </div>

        <div className="summary-section">
          <h3>Travel Details</h3>
          <div className="summary-content">
            <p><strong>Origin:</strong> {tripData.origin}</p>
            <p><strong>Duration:</strong> {tripData.startDate} to {tripData.endDate}</p>
            <p><strong>Travelers:</strong> {tripData.adults} Adult(s), {tripData.children} Children</p>
          </div>
        </div>

        <div className="summary-section">
          <h3>Destinations</h3>
          <div className="summary-content">
            <p><strong>States:</strong> {selectedStateNames.join(', ')}</p>
            <p><strong>Districts:</strong> {tripData.districts.map(id => getDistrictName(id)).join(', ')}</p>
          </div>
        </div>

        <div className="summary-section">
          <h3>Tourist Places</h3>
          <div className="places-list">
            {tripData.places.map(placeId => (
              <span key={placeId} className="place-tag">{getPlaceName(placeId)}</span>
            ))}
          </div>
        </div>

        <div className="summary-section">
          <h3>Transportation</h3>
          <div className="summary-content">
            <p>{tripData.transportation.type} - {tripData.transportation.class}</p>
          </div>
        </div>

        <div className="summary-section">
          <h3>Accommodation & Food</h3>
          <div className="summary-content">
            <p><strong>Hotel:</strong> {tripData.accommodation.hotelRating}</p>
            <p><strong>Food:</strong> {tripData.accommodation.foodType}</p>
          </div>
        </div>

        <div className="summary-total">
          <h3>Total Estimated Cost</h3>
          <div className="total-amount">₹{totalCost.toLocaleString()}</div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handlePlanNewTrip} className="btn-secondary">
            Plan New Trip
          </button>
          <button type="button" onClick={handleSaveTrip} className="btn-primary">
            Save This Trip
          </button>
        </div>
      </div>

      {/* 🧳 Packing Suggestions */}
      <div className="packing-suggestions">
        <h3>🧳 Packing Suggestions</h3>
        <p>Based on your selected destination:</p>
        {selectedStateNames.length > 0 ? (
          selectedStateNames.map((state, idx) => (
            <div key={idx} className="packing-item">
              <h4>{state}</h4>
              <ul>
                {(packingSuggestions[state] || ['General essentials like clothes, shoes, and toiletries']).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No states selected.</p>
        )}
      </div>

      {/* 💬 Feedback Section */}
      <div className="feedback-section">
        <h3>💬 We value your feedback!</h3>
        <p>How was your trip planning experience?</p>
        <textarea
          rows="4"
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="feedback-textarea"
        ></textarea>
        <button onClick={handleFeedbackSubmit} className="btn-primary">
          Submit Feedback
        </button>
        {feedbackSubmitted && <p className="success-message">✅ Thank you for your feedback!</p>}
      </div>
    </div>
  );
}

export default TripSummary;
