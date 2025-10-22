import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { touristPlaces, districtsData } from '../data/travelData';
import './TravelForm.css';

function SelectPlaces({ tripData, setTripData }) {
  const [selectedPlaces, setSelectedPlaces] = useState(tripData.places || []);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const availablePlaces = tripData.districts.flatMap(districtId =>
    (touristPlaces[districtId] || []).map(place => ({
      ...place,
      districtId
    }))
  );

  const togglePlace = (placeId) => {
    if (selectedPlaces.includes(placeId)) {
      setSelectedPlaces(selectedPlaces.filter(id => id !== placeId));
    } else {
      setSelectedPlaces([...selectedPlaces, placeId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (selectedPlaces.length === 0) {
      setError('Please select at least one tourist place');
      return;
    }

    setTripData({
      ...tripData,
      places: selectedPlaces
    });

    navigate('/trip-details');
  };

  const handleBack = () => {
    navigate('/select-districts');
  };

  const getDistrictName = (districtId) => {
    const allDistricts = Object.values(districtsData).flat();
    return allDistricts.find(d => d.id === districtId)?.name || '';
  };

  const groupedPlaces = tripData.districts.reduce((acc, districtId) => {
    acc[districtId] = touristPlaces[districtId] || [];
    return acc;
  }, {});

  return (
    <div className="travel-form-container">
      <div className="travel-form-card">
        <div className="form-header">
          <h2>Step 4: Select Tourist Places</h2>
          <p>Choose the attractions you want to visit</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="selection-info">
          {selectedPlaces.length} place(s) selected
        </div>

        {Object.entries(groupedPlaces).map(([districtId, places]) => (
          <div key={districtId} className="state-section">
            <h3 className="state-title">{getDistrictName(Number(districtId))}</h3>
            <div className="places-grid">
              {places.map(place => (
                <div
                  key={place.id}
                  className={`place-card ${selectedPlaces.includes(place.id) ? 'selected' : ''}`}
                  onClick={() => togglePlace(place.id)}
                >
                  <h4>{place.name}</h4>
                  <div className="place-info">
                    <span className="place-type">{place.type}</span>
                    <span className="place-rating">⭐ {place.rating}</span>
                  </div>
                  {selectedPlaces.includes(place.id) && (
                    <span className="checkmark">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="form-actions">
          <button type="button" onClick={handleBack} className="btn-secondary">
            Back
          </button>
          <button type="button" onClick={handleSubmit} className="btn-primary">
            Next: Trip Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectPlaces;
