import React from 'react';
import { useNavigate } from 'react-router-dom';

const CurrencyConverter = () => {
  const navigate = useNavigate();

  const goToExchange = () => {
    navigate('/exchange');
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <button onClick={goToExchange}>Go to Exchange</button>
    </div>
  );
};

export default CurrencyConverter;
