import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchangeRates } from '../slices/exchangeRatesSlice';

const Header = () => {
  const currentCurrency = useSelector((state) => state.exchangeRates.baseCurrency);

  const dispatch = useDispatch();

  return (
    <header>
      <div>Current Currency: {currentCurrency}</div>
      <button onClick={() => dispatch(fetchExchangeRates())}>Update Exchange Rates</button>
    </header>
  );
};

export default Header;
