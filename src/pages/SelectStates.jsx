import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { indianStates } from '../data/travelData';
import './TravelForm.css';

function SelectStates({ tripData, setTripData }) {
  const [selectedStates, setSelectedStates] = useState(tripData.states || []);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleState = (stateId) => {
    if (selectedStates.includes(stateId)) {
      setSelectedStates(selectedStates.filter(id => id !== stateId));
    } else {
      setSelectedStates([...selectedStates, stateId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (selectedStates.length === 0) {
      setError('Please select at least one state');
      return;
    }

    setTripData({
      ...tripData,
      states: selectedStates,
      districts: [],
      places: []
    });

    navigate('/select-districts');
  };

  const handleBack = () => {
    navigate('/travel-origin');
  };

  return (
    <div className="travel-form-container">
      <div className="travel-form-card">
        <div className="form-header">
          <h2>Step 2: Select States</h2>
          <p>Choose one or more states you want to visit</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="selection-info">
          {selectedStates.length} state(s) selected
        </div>

        <div className="selection-grid">
          {indianStates.map(state => (
            <div
              key={state.id}
              className={`selection-card ${selectedStates.includes(state.id) ? 'selected' : ''}`}
              onClick={() => toggleState(state.id)}
            >
              <h3>{state.name}</h3>
              <span className="region-badge">{state.region} India</span>
              {selectedStates.includes(state.id) && (
                <span className="checkmark">✓</span>
              )}
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleBack} className="btn-secondary">
            Back
          </button>
          <button type="button" onClick={handleSubmit} className="btn-primary">
            Next: Select Districts
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectStates;
