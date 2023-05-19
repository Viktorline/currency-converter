import { InputNumber, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/styles/index.sass';
import { changeBase, fetchExchangeRates } from '../slices/exchangeRatesSlice.js';
import { converter } from '../utils/converter.js';

const { Option } = Select;

const CurrencyConverter = () => {
  const dispatch = useDispatch();

  const exchangeRates = useSelector((state) => state.exchangeRates.data.rates);
  const baseRate = useSelector((state) => state.exchangeRates.base);
  const status = useSelector((state) => state.exchangeRates.status);
  const error = useSelector((state) => state.exchangeRates.error);

  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState(baseRate);
  const [toCurrency, setToCurrency] = useState(baseRate);
  const [convertedAmount, setConvertedAmount] = useState('');

  useEffect(() => {
    if (!exchangeRates) {
      dispatch(fetchExchangeRates());
    }
  }, [status, dispatch, exchangeRates]);

  useEffect(() => {
    const newAmount = converter(amount, fromCurrency, toCurrency, exchangeRates);
    setConvertedAmount(newAmount);
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

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
      <h2>Converter</h2>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'succeeded' && (
        <div>
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
      )}
      {status === 'failed' && <div>{error}</div>}
    </div>
  );
};

export default CurrencyConverter;
