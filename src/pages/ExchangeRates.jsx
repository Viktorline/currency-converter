import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeBase, fetchExchangeRates } from '../slices/exchangeRatesSlice.js';

const ExchangeRates = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const exchangeRates = useSelector((state) => state.exchangeRates.data);
  const status = useSelector((state) => state.exchangeRates.status);
  const error = useSelector((state) => state.exchangeRates.error);
  const baseRate = useSelector((state) => state.exchangeRates.base);

  useEffect(() => {
    if (!exchangeRates) {
      dispatch(fetchExchangeRates());
    }
    if (status === 'idle') {
      dispatch(fetchExchangeRates());
    }
  }, [exchangeRates, status, dispatch]);

  const goToCurrencyConverter = () => {
    navigate('/convert');
  };

  const handleBaseChange = (e) => {
    dispatch(changeBase(e.target.value));
    dispatch(fetchExchangeRates());
  };

  return (
    <div>
      <h1>Exchange Rates</h1>
      <h4>Your currency: {baseRate}</h4>
      <button onClick={goToCurrencyConverter}>Go to Currency Converter</button>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'succeeded' && exchangeRates && exchangeRates.rates && (
        <div>
          <select value={baseRate} onChange={handleBaseChange}>
            {Object.keys(exchangeRates.rates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          {Object.entries(exchangeRates.rates).map(([currency, rate]) => (
            <div key={currency}>
              {currency}: {rate}
            </div>
          ))}
        </div>
      )}
      {status === 'failed' && <div>{error}</div>}
    </div>
  );
};

export default ExchangeRates;
