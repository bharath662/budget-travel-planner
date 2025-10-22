import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { transportationOptions } from '../data/travelData';
import './TravelForm.css';

function Transportation({ tripData, setTripData }) {
  const [selectedTransport, setSelectedTransport] = useState(tripData.transportation || null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSelectTransport = (type, className) => {
    setSelectedTransport({ type, class: className });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedTransport) {
      setError('Please select a transportation option');
      return;
    }

    setTripData({
      ...tripData,
      transportation: selectedTransport
    });

    navigate('/accommodation');
  };

  const handleBack = () => {
    navigate('/trip-details');
  };

  return (
    <div className="travel-form-container">
      <div className="travel-form-card">
        <div className="form-header">
          <h2>Step 6: Transportation</h2>
          <p>Choose your preferred mode of transport and class</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {selectedTransport && (
          <div className="selection-info">
            Selected: {selectedTransport.type} - {selectedTransport.class}
          </div>
        )}

        <div className="transport-options">
          {transportationOptions.map(transport => (
            <div key={transport.type} className="transport-section">
              <h3 className="transport-title">
                {transport.type === 'Flight' && '✈️'}
                {transport.type === 'Train' && '🚂'}
                {transport.type === 'Bus' && '🚌'}
                {transport.type === 'Car' && '🚗'}
                {' '}{transport.type}
              </h3>
              <div className="transport-classes">
                {transport.classes.map(classOption => (
                  <div
                    key={classOption.name}
                    className={`transport-card ${
                      selectedTransport?.type === transport.type &&
                      selectedTransport?.class === classOption.name
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() => handleSelectTransport(transport.type, classOption.name)}
                  >
                    <h4>{classOption.name}</h4>
                     
                    {selectedTransport?.type === transport.type &&
                      selectedTransport?.class === classOption.name && (
                        <span className="checkmark">✓</span>
                      )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleBack} className="btn-secondary">
            Back
          </button>
          <button type="button" onClick={handleSubmit} className="btn-primary">
            Next: Accommodation
          </button>
        </div>
      </div>
    </div>
  );
}

export default Transportation;
