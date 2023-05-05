import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchExchangeRates } from '../slices/exchangeRatesSlice.js';

const ExchangeRates = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const exchangeRates = useSelector((state) => state.exchangeRates.data);
  const status = useSelector((state) => state.exchangeRates.status);
  const error = useSelector((state) => state.exchangeRates.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchExchangeRates());
    }
  }, [status, dispatch]);

  const goToCurrencyConverter = () => {
    navigate('/convert');
  };

  return (
    <div>
      <h1>Exchange Rates</h1>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'succeeded' &&
        Object.entries(exchangeRates.rates).map(([currency, rate]) => (
          <div key={currency}>
            {currency}: {rate}
          </div>
        ))}
      {status === 'failed' && <div>{error}</div>}
      <button onClick={goToCurrencyConverter}>Go to Currency Converter</button>
    </div>
  );
};

export default ExchangeRates;
