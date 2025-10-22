import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Budget Travel Planner
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/saved-trips" className="nav-link">My Trips</Link>
              </li>
                <li className="nav-item">
                <Link to="/feedback" className="nav-link">Feedback</Link>
              </li>

              <li className="nav-item">
                <Link to="/feedback-list" className="nav-link">View Feedbacks</Link>
              </li>
              <li className="nav-item">
                <span className="nav-user">Welcome, {user.name}</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-button">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-button">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
