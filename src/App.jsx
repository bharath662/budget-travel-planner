import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TravelOrigin from './pages/TravelOrigin';
import SelectStates from './pages/SelectStates';
import SelectDistricts from './pages/SelectDistricts';
import SelectPlaces from './pages/SelectPlaces';
import TripDetails from './pages/TripDetails';
import Transportation from './pages/Transportation';
import Accommodation from './pages/Accommodation';
import BudgetEstimation from './pages/BudgetEstimation';
import TripSummary from './pages/TripSummary';
import SavedTrips from './pages/SavedTrips';
import FeedbackList from './pages/FeedbackList';

function App() {
  const [user, setUser] = useState(null);
  const [tripData, setTripData] = useState({
    origin: '',
    startDate: '',
    endDate: '',
    states: [],
    districts: [],
    places: [],
    adults: 1,
    children: 0,
    transportation: null,
    accommodation: null,
    budget: 0
  });

  return (
    <Router>
      <div className="app">
        <Navbar user={user} setUser={setUser} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/travel-origin" element={<TravelOrigin tripData={tripData} setTripData={setTripData} />} />
            <Route path="/select-states" element={<SelectStates tripData={tripData} setTripData={setTripData} />} />
            <Route path="/select-districts" element={<SelectDistricts tripData={tripData} setTripData={setTripData} />} />
            <Route path="/select-places" element={<SelectPlaces tripData={tripData} setTripData={setTripData} />} />
            <Route path="/trip-details" element={<TripDetails tripData={tripData} setTripData={setTripData} />} />
            <Route path="/transportation" element={<Transportation tripData={tripData} setTripData={setTripData} />} />
            <Route path="/accommodation" element={<Accommodation tripData={tripData} setTripData={setTripData} />} />
            <Route path="/budget-estimation" element={<BudgetEstimation tripData={tripData} />} />
            <Route path="/trip-summary" element={<TripSummary tripData={tripData} user={user} />} />
            <Route path="/saved-trips" element={<SavedTrips user={user} />} />
            <Route path="/feedback-list" element={<FeedbackList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
