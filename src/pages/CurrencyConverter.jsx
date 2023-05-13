import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeBase, fetchExchangeRates } from '../slices/exchangeRatesSlice.js';
import { converter } from '../utils/converter.js';

const CurrencyConverter = () => {
  const exchangeRates = useSelector((state) => state.exchangeRates.data.rates);
  const baseRate = useSelector((state) => state.exchangeRates.base);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState(baseRate);
  const [toCurrency, setToCurrency] = useState(baseRate);
  const [convertedAmount, setConvertedAmount] = useState('');

  const status = useSelector((state) => state.exchangeRates.status);

  useEffect(() => {
    if (!exchangeRates) {
      dispatch(fetchExchangeRates());
    }
  }, [status, dispatch, exchangeRates]);

  useEffect(() => {
    const newAmount = converter(amount, fromCurrency, toCurrency, exchangeRates);
    setConvertedAmount(newAmount);
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const goToExchange = () => {
    navigate('/exchange');
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    const newBase = e.target.value;
    setFromCurrency(newBase);
    dispatch(changeBase(newBase));
    dispatch(fetchExchangeRates(newBase));
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  if (!exchangeRates) {
    return <div>Loading...</div>;
  }

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
