import { Input, List, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeBase, fetchExchangeRates } from '../slices/exchangeRatesSlice.js';

const { Option } = Select;

const ExchangeRates = () => {
  const dispatch = useDispatch();

  const exchangeRates = useSelector((state) => state.exchangeRates.data);
  const status = useSelector((state) => state.exchangeRates.status);
  const error = useSelector((state) => state.exchangeRates.error);
  const baseRate = useSelector((state) => state.exchangeRates.base);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!exchangeRates) {
      dispatch(fetchExchangeRates());
    }
    if (status === 'idle') {
      dispatch(fetchExchangeRates());
    }
  }, [exchangeRates, status, dispatch]);

  const handleBaseChange = (value) => {
    dispatch(changeBase(value));
    dispatch(fetchExchangeRates(value));
    setSearchTerm('');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="content">
      <h2 className="exchange-header">Your currency: {baseRate}</h2>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'succeeded' && exchangeRates && (
        <div>
          <form
            className="exchange"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Select
              showSearch
              value={baseRate}
              onChange={handleBaseChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().startsWith(input.toLowerCase())
              }
            >
              {Object.keys(exchangeRates.rates).map((currency) => (
                <Option key={currency} value={currency}>
                  {currency}
                </Option>
              ))}
            </Select>
            <Input
              name="search"
              placeholder="Search"
              onChange={handleSearchChange}
              autoComplete="off"
            />
          </form>
          <List
            size="large"
            bordered
            className="list"
            dataSource={Object.entries(exchangeRates.rates).filter(([currency]) =>
              currency.toLowerCase().includes(searchTerm.toLowerCase()),
            )}
            renderItem={([currency, rate]) => (
              <List.Item>
                <strong>{currency}</strong>: {rate}
              </List.Item>
            )}
          />
        </div>
      )}
      {status === 'failed' && <div>{error}</div>}
    </div>
  );
};

export default ExchangeRates;
