import { useNavigate } from 'react-router-dom';
import {
  transportationOptions,
  accommodationOptions,
  foodOptions,
  indianStates,
  calculateDistance
} from '../data/travelData';
import './TravelForm.css';

function BudgetEstimation({ tripData }) {
  const navigate = useNavigate();

  const calculateTripCost = () => {
    const nights = Math.ceil(
      (new Date(tripData.endDate) - new Date(tripData.startDate)) / (1000 * 60 * 60 * 24)
    );

    const selectedStateNames = tripData.states.map(
      stateId => indianStates.find(s => s.id === stateId)?.name
    );
    const distance = calculateDistance(tripData.origin, selectedStateNames);

    const transportOption = transportationOptions
      .find(t => t.type === tripData.transportation.type)
      ?.classes.find(c => c.name === tripData.transportation.class);

    const transportCost = transportOption
      ? (transportOption.basePrice + transportOption.pricePerKm * distance) * (tripData.adults + tripData.children * 0.5)
      : 0;

    const accommodation = accommodationOptions.find(
      a => a.rating === tripData.accommodation.hotelRating
    );
    const accommodationCost = accommodation
      ? accommodation.pricePerNight * nights * Math.ceil((tripData.adults + tripData.children) / 2)
      : 0;

    const food = foodOptions.find(f => f.type === tripData.accommodation.foodType);
    const foodCost = food ? food.pricePerDay * (nights + 1) * (tripData.adults + tripData.children) : 0;

    const miscCost = (transportCost + accommodationCost + foodCost) * 0.15;

    const total = transportCost + accommodationCost + foodCost + miscCost;

    return {
      transportCost: Math.round(transportCost),
      accommodationCost: Math.round(accommodationCost),
      foodCost: Math.round(foodCost),
      miscCost: Math.round(miscCost),
      total: Math.round(total),
      nights,
      distance
    };
  };

  const budget = calculateTripCost();

  const handleViewSummary = () => {
    navigate('/trip-summary');
  };

  const handleBack = () => {
    navigate('/accommodation');
  };

  return (
    <div className="travel-form-container">
      <div className="travel-form-card">
        <div className="form-header">
          <h2>Budget Estimation</h2>
          <p>Here's the estimated cost breakdown for your trip</p>
        </div>

        <div className="budget-summary">
          <div className="budget-card total-budget">
            <h3>Total Estimated Cost</h3>
            <div className="budget-amount">₹{budget.total.toLocaleString()}</div>
            <p className="budget-note">For {tripData.adults + tripData.children} traveler(s)</p>
          </div>

          <div className="budget-breakdown">
            <h3>Cost Breakdown</h3>

            <div className="breakdown-item">
              <div className="item-header">
                <span className="item-icon">✈️</span>
                <span className="item-name">Transportation</span>
              </div>
              <div className="item-details">
                <p>{tripData.transportation.type} - {tripData.transportation.class}</p>
                <p className="detail-text">Distance: ~{budget.distance} km</p>
              </div>
              <div className="item-cost">₹{budget.transportCost.toLocaleString()}</div>
            </div>

            <div className="breakdown-item">
              <div className="item-header">
                <span className="item-icon">🏨</span>
                <span className="item-name">Accommodation</span>
              </div>
              <div className="item-details">
                <p>{tripData.accommodation.hotelRating}</p>
                <p className="detail-text">{budget.nights} night(s)</p>
              </div>
              <div className="item-cost">₹{budget.accommodationCost.toLocaleString()}</div>
            </div>

            <div className="breakdown-item">
              <div className="item-header">
                <span className="item-icon">🍽️</span>
                <span className="item-name">Food</span>
              </div>
              <div className="item-details">
                <p>{tripData.accommodation.foodType}</p>
                <p className="detail-text">{budget.nights + 1} day(s)</p>
              </div>
              <div className="item-cost">₹{budget.foodCost.toLocaleString()}</div>
            </div>

            <div className="breakdown-item">
              <div className="item-header">
                <span className="item-icon">💼</span>
                <span className="item-name">Miscellaneous</span>
              </div>
              <div className="item-details">
                <p className="detail-text">Entry fees, local travel, etc.</p>
              </div>
              <div className="item-cost">₹{budget.miscCost.toLocaleString()}</div>
            </div>
          </div>

          <div className="per-person-cost">
            <p>Cost per person: ₹{Math.round(budget.total / (tripData.adults + tripData.children)).toLocaleString()}</p>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleBack} className="btn-secondary">
            Back
          </button>
          <button type="button" onClick={handleViewSummary} className="btn-primary">
            View Trip Summary
          </button>
        </div>
      </div>
    </div>
  );
}

export default BudgetEstimation;
