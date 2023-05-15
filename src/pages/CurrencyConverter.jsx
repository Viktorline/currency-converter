import { Button, InputNumber, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/index.sass';
import { changeBase, fetchExchangeRates } from '../slices/exchangeRatesSlice.js';
import { converter } from '../utils/converter.js';

const { Option } = Select;
const { Title } = Typography;

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

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleFromCurrencyChange = (value) => {
    setFromCurrency(value);
    dispatch(changeBase(value));
    dispatch(fetchExchangeRates(value));
  };

  const handleToCurrencyChange = (value) => {
    setToCurrency(value);
  };

  if (!exchangeRates) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <Title level={2}>Converter</Title>
      <Button type="primary" onClick={goToExchange}>
        Go to Exchange
      </Button>
      <div>
        <InputNumber
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
        />
        <Select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {Object.keys(exchangeRates).map((currency) => (
            <Option key={currency} value={currency}>
              {currency}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <InputNumber
          type="number"
          value={convertedAmount}
          readOnly
          placeholder="Converted amount"
        />
        <Select value={toCurrency} onChange={handleToCurrencyChange}>
          {Object.keys(exchangeRates).map((currency) => (
            <Option key={currency} value={currency}>
              {currency}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default CurrencyConverter;
