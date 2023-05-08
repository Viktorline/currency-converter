import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchExchangeRates } from '../slices/exchangeRatesSlice';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header>
      <button onClick={() => dispatch(fetchExchangeRates())}>Update Exchange Rates</button>
    </header>
  );
};

export default Header;
