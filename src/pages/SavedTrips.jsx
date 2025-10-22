import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { indianStates } from '../data/travelData';
import './TravelForm.css';

function SavedTrips({ user }) {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const savedTrips = JSON.parse(localStorage.getItem(`trips_${user.email}`) || '[]');
    setTrips(savedTrips.reverse());
  }, [user, navigate]);

  const handleDeleteTrip = (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      const updatedTrips = trips.filter(trip => trip.id !== tripId);
      localStorage.setItem(`trips_${user.email}`, JSON.stringify(updatedTrips.reverse()));
      setTrips(updatedTrips);
    }
  };

  const handlePlanNewTrip = () => {
    navigate('/travel-origin');
  };

  const getStateName = (stateId) => {
    return indianStates.find(s => s.id === stateId)?.name || '';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="travel-form-container">
      <div className="saved-trips-container">
        <div className="form-header">
          <h2>My Saved Trips</h2>
          <p>View and manage your saved trip plans</p>
        </div>

        {trips.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No Saved Trips Yet</h3>
            <p>Start planning your first trip and save it for later</p>
            <button onClick={handlePlanNewTrip} className="btn-primary">
              Plan Your First Trip
            </button>
          </div>
        ) : (
          <>
            <div className="trips-grid">
              {trips.map(trip => (
                <div key={trip.id} className="trip-card">
                  <div className="trip-header">
                    <h3>{trip.origin} → {trip.states.map(id => getStateName(id)).join(', ')}</h3>
                    <span className="trip-cost">₹{trip.totalCost.toLocaleString()}</span>
                  </div>

                  <div className="trip-details">
                    <p className="trip-date">
                      📅 {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </p>
                    <p className="trip-travelers">
                      👥 {trip.adults + trip.children} Traveler(s)
                    </p>
                    <p className="trip-transport">
                      {trip.transportation.type === 'Flight' && '✈️'}
                      {trip.transportation.type === 'Train' && '🚂'}
                      {trip.transportation.type === 'Bus' && '🚌'}
                      {trip.transportation.type === 'Car' && '🚗'}
                      {' '}{trip.transportation.type} - {trip.transportation.class}
                    </p>
                    <p className="trip-hotel">
                      🏨 {trip.accommodation.hotelRating}
                    </p>
                    <p className="trip-places">
                      📍 {trip.places.length} Place(s) to Visit
                    </p>
                  </div>

                  <div className="trip-footer">
                    <small className="trip-saved">
                      Saved on {formatDate(trip.createdAt)}
                    </small>
                    <button
                      onClick={() => handleDeleteTrip(trip.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="trips-actions">
              <button onClick={handlePlanNewTrip} className="btn-primary">
                Plan New Trip
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SavedTrips;
