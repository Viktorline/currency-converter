import { List, Select, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeBase, fetchExchangeRates } from '../slices/exchangeRatesSlice.js';

const { Option } = Select;
const { Title } = Typography;

const ExchangeRates = () => {

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



  const handleBaseChange = (value) => {
    dispatch(changeBase(value));
    dispatch(fetchExchangeRates());
  };

  return (
    <div className="content">
      <Title level={2}>Exchange Rates</Title>
      <Title level={5}>Your currency: {baseRate}</Title>

      {status === 'loading' && <div>Loading...</div>}
      {status === 'succeeded' && exchangeRates && exchangeRates.rates && (
        <div>
          <Select value={baseRate} onChange={handleBaseChange}>
            {Object.keys(exchangeRates.rates).map((currency) => (
              <Option key={currency} value={currency}>
                {currency}
              </Option>
            ))}
          </Select>
          <List
            size="large"
            bordered
            className="list"
            dataSource={Object.entries(exchangeRates.rates)}
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
