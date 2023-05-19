import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchExchangeRates } from '../slices/exchangeRatesSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const goToCurrencyConverter = () => {
    navigate('/convert');
  };

  const goToExchange = () => {
    navigate('/exchange');
  };

  return (
    <header className="header">
      <h1 className="logo">Currency Converter</h1>
      <div className="buttongroup">
        <button
          className={location.pathname === '/convert' ? 'pageOn' : 'pageOff'}
          onClick={goToCurrencyConverter}
        >
          Convert
        </button>
        <button
          className={location.pathname === '/exchange' ? 'pageOn' : 'pageOff'}
          onClick={goToExchange}
        >
          Exchange
        </button>
        <button className="reloadbutton" onClick={() => dispatch(fetchExchangeRates())}>
          &#x21BB;
        </button>
      </div>
    </header>
  );
};

export default Header;
