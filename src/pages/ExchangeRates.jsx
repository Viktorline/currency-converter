import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExchangeRates = () => {
  const navigate = useNavigate();

  const goToCurrencyConverter = () => {
    navigate('/convert');
  };

  return (
    <div>
      <h1>ExchangeRates</h1>

      <button onClick={goToCurrencyConverter}>Go to Currency Converter</button>
    </div>
  );
};

export default ExchangeRates;
