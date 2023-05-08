import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { convertCurrency } from '../utils/index.js';

const CurrencyConverter = () => {
  const exchangeRates = useSelector((state) => state.exchangeRates.data.rates);

  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState('');

  useEffect(() => {
    const newAmount = convertCurrency(amount, fromCurrency, toCurrency, exchangeRates);
    setConvertedAmount(newAmount);
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const goToExchange = () => {
    navigate('/exchange');
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <button onClick={goToExchange}>Go to Exchange</button>
      <div>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
        />
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input type="number" value={convertedAmount} readOnly placeholder="Converted amount" />
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyConverter;
