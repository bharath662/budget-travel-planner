import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home({ user }) {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    if (user) {
      navigate('/travel-origin');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">Plan Your Dream Trip Within Budget</h1>
        <p className="hero-subtitle">
          Discover amazing destinations across India with smart budget planning
        </p>
        <button onClick={handleStartPlanning} className="cta-button">
          Start Planning Your Trip
        </button>
      </div>

      <div className="features-section">
        <h2 className="section-title">Why Choose Budget Travel Planner?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>Multi-Destination Planning</h3>
            <p>Plan trips across multiple states and districts in one go</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Budget Estimation</h3>
            <p>Get accurate cost breakdowns for transportation, stay, and food</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏨</div>
            <h3>Flexible Options</h3>
            <p>Choose from various transportation and accommodation options</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Save & Revisit</h3>
            <p>Save your trip plans and access them anytime</p>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Select Origin & Dates</h3>
            <p>Tell us where you're starting from and when you want to travel</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Choose Destinations</h3>
            <p>Pick states, districts, and tourist places you want to visit</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Set Preferences</h3>
            <p>Select transportation, accommodation, and other travel preferences</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Get Your Budget</h3>
            <p>Receive detailed cost estimation and save your trip plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
