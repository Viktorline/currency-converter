import { Button, Typography } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchExchangeRates } from '../slices/exchangeRatesSlice';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const goToCurrencyConverter = () => {
    navigate('/convert');
  };

  const goToExchange = () => {
    navigate('/exchange');
  };

  return (
    <header className="header">
      <Title level={1}>Currency Converter App</Title>
      <Button type="dashed" onClick={() => dispatch(fetchExchangeRates())}>
        Update Exchange Rates
      </Button>
      <Button type="primary" onClick={goToCurrencyConverter}>
        Go to Currency Converter
      </Button>
      <Button type="primary" onClick={goToExchange}>
        Go to Exchange
      </Button>
    </header>
  );
};

export default Header;
