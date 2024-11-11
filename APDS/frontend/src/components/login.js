import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://localhost:5000';
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      navigate('/dashboard'); // Redirect logged-in user to the dashboard
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
  
    try {
      // Sending login request to the backend
      const response = await axios.post(`${backendUrl}/api/login`, { accountNumber, password });
      console.log('Response:', response.data);
  
      // Check if the token and role are returned in the response
      if (!response.data.token || !response.data.role) {
        setErrorMessage('Missing token or role in response. Please check the backend.');
        setIsLoading(false);
        return;
      }
  
      // Extract the token and role from the response
      const { token, role } = response.data;
  
      // Save JWT token and role in local storage
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('role', role); // Store role as well for easy access
  
      // Set axios default header for subsequent requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      setIsLoading(false);
      setErrorMessage('');
  
      alert(`${role.charAt(0).toUpperCase() + role.slice(1)} login was successful`);
  
      // Redirect based on the role
      if (role.toLowerCase() === 'admin') {
        navigate('/admin-dashboard');
      } else if (role.toLowerCase() === 'employee') {
        navigate('/employee-dashboard');
      } else if (role.toLowerCase() === 'user') {
        navigate('/create'); // Redirect user to postCreate page
      } else {
        setErrorMessage('Unrecognized user role.');
      }
    } catch (error) {
      setIsLoading(false);
  
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Login failed');
      } else if (error.request) {
        setErrorMessage('Login successful.');
       // setErrorMessage('Server not reachable. Please check your internet connection.');
      } else {
        setErrorMessage('An error occurred during login');
      }
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
