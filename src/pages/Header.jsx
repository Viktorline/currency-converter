import { Button, Typography } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchExchangeRates } from '../slices/exchangeRatesSlice';

const { Title } = Typography;

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header>
      <Title level={1}>Currency Converter App</Title>
      <Button type="dashed" onClick={() => dispatch(fetchExchangeRates())}>
        Update Exchange Rates
      </Button>
    </header>
  );
};

export default Header;
