import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useNavigate } from "react-router-dom"; // Add useNavigate for programmatic navigation
import axios from "axios"; // Make sure axios is installed
import './Navbar.css';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Add the navigate hook to navigate programmatically

  useEffect(() => {
    // Check if user is logged in by checking for the presence of a JWT token
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      setIsLoggedIn(true); // Set logged in state if token exists
    }
  }, []); // Dependency array is empty so it runs only once when the component mounts

  // Function to handle login
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, password });

      const { token } = response.data; // Assuming response contains JWT token

      localStorage.setItem("jwtToken", token); // Store JWT token in localStorage
      setIsLoggedIn(true);
      navigate('/'); // Navigate to the homepage or a dashboard after login
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        Jaddu Inc. {/* Brand name */}
      </NavLink>

      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/create">
              Create Post
            </NavLink>
          </li>

          {/* Display Register button for everyone */}
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>

          {/* Display Login button for everyone */}
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>

          {/* Display Logout button for logged-in users */}
          {isLoggedIn && (
            <li className="nav-item">
              <button className="btn btn-danger" onClick={() => {
                localStorage.removeItem("jwtToken");
                setIsLoggedIn(false);
                navigate('/'); // Redirect to the homepage or a login page after logout
              }}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
