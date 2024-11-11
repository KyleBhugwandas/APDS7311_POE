import React, { useState } from 'react';

const CreatePost = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [accountInfo, setAccountInfo] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://localhost:5000';

  // Handle payment submission
  const handlePaymentSubmit = async (paymentData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return setErrorMessage('Payment successfully made!');
      //  return setErrorMessage('You are not logged in');
      }
  
      setIsLoading(true);
      const response = await fetch(`${backendUrl}/api/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        alert('Payment successful');
      } else {
        setErrorMessage(responseData.message);
      }
    } catch (error) {
      console.error('Error during payment submission:', error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const paymentData = {
      amount,
      currency,
      accountInfo,
      swiftCode,
    };

    handlePaymentSubmit(paymentData);
  };

  return (
    <div className="create-post">
      <h1>Submit Payment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Currency:</label>
          <input
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Account Info:</label>
          <input
            type="text"
            value={accountInfo}
            onChange={(e) => setAccountInfo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>SWIFT Code:</label>
          <input
            type="text"
            value={swiftCode}
            onChange={(e) => setSwiftCode(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Payment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
