import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { districtsData, indianStates } from '../data/travelData';
import './TravelForm.css';

function SelectDistricts({ tripData, setTripData }) {
  const [selectedDistricts, setSelectedDistricts] = useState(tripData.districts || []);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const availableDistricts = tripData.states.flatMap(stateId =>
    districtsData[stateId] || []
  );

  const toggleDistrict = (districtId) => {
    if (selectedDistricts.includes(districtId)) {
      setSelectedDistricts(selectedDistricts.filter(id => id !== districtId));
    } else {
      setSelectedDistricts([...selectedDistricts, districtId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (selectedDistricts.length === 0) {
      setError('Please select at least one district');
      return;
    }

    setTripData({
      ...tripData,
      districts: selectedDistricts,
      places: []
    });

    navigate('/select-places');
  };

  const handleBack = () => {
    navigate('/select-states');
  };

  const getStateName = (stateId) => {
    return indianStates.find(s => s.id === stateId)?.name || '';
  };

  return (
    <div className="travel-form-container">
      <div className="travel-form-card">
        <div className="form-header">
          <h2>Step 3: Select Districts</h2>
          <p>Choose districts you want to explore</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="selection-info">
          {selectedDistricts.length} district(s) selected
        </div>

        {tripData.states.map(stateId => {
          const districts = districtsData[stateId] || [];
          return (
            <div key={stateId} className="state-section">
              <h3 className="state-title">{getStateName(stateId)}</h3>
              <div className="selection-grid">
                {districts.map(district => (
                  <div
                    key={district.id}
                    className={`selection-card ${selectedDistricts.includes(district.id) ? 'selected' : ''}`}
                    onClick={() => toggleDistrict(district.id)}
                  >
                    <h4>{district.name}</h4>
                    {selectedDistricts.includes(district.id) && (
                      <span className="checkmark">✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="form-actions">
          <button type="button" onClick={handleBack} className="btn-secondary">
            Back
          </button>
          <button type="button" onClick={handleSubmit} className="btn-primary">
            Next: Select Places
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectDistricts;
