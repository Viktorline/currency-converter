import { Button, InputNumber, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    dispatch(changeBase(toCurrency));
    dispatch(fetchExchangeRates(toCurrency));
  };

  if (!exchangeRates) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      {status === 'loading' && <div>Loading...</div>}
      {status === 'succeeded' && (
        <div className="converter-block">
          <form
            className="converter"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <InputNumber
              type="number"
              name="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
            />
            <Select
              showSearch
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().startsWith(input.toLowerCase())
              }
            >
              {Object.keys(exchangeRates).map((currency) => (
                <Option key={currency} value={currency}>
                  {currency}
                </Option>
              ))}
            </Select>
          </form>
          <Button className="swap-button" onClick={handleSwapCurrencies}>
            &#x21c5;
          </Button>
          <form
            className="converter"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <InputNumber
              name="converted-amount"
              type="number"
              value={convertedAmount}
              readOnly
              placeholder="Converted amount"
            />
            <Select
              showSearch
              value={toCurrency}
              onChange={handleToCurrencyChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().startsWith(input.toLowerCase())
              }
            >
              {Object.keys(exchangeRates).map((currency) => (
                <Option key={currency} value={currency}>
                  {currency}
                </Option>
              ))}
            </Select>
          </form>
        </div>
      )}
      {status === 'failed' && <div>{error}</div>}
    </div>
  );
};

export default CurrencyConverter;
