import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Corrected the import statement

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://localhost:5000';
  const token = localStorage.getItem('jwtToken'); // Fetch token from localStorage

  // Decode token to check for admin role
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Updated to use jwtDecode
        setIsAdmin(decodedToken.role === 'admin');
      } catch (error) {
        console.error('Invalid token', error);
        setError('Invalid session. Please log in again.');
      }
    }
  }, [token]);

  const validateAccountNumber = (account) => /^\d{10}$/.test(account);
  const validatePassword = (pwd) => pwd.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      setError('You do not have permission to create a new account.');
      return;
    }

    if (!validateAccountNumber(accountNumber)) {
      setError('Account number must be a 10-digit number');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const userData = {
      fullName,
      idNumber,
      accountNumber,
      password,
      role,
    };

    try {
      const response = await axios.post(
        `${backendUrl}/api/employee/create-user`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess('User successfully created');
        setError('');
        setFullName('');
        setIdNumber('');
        setAccountNumber('');
        setPassword('');
        setRole('user');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred during registration');
      }
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>ID Number</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
          />
        </div>

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

        <div>
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <button type="submit" disabled={loading || !isAdmin}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </div>
  );
};

export default Register;
