import { configureStore } from '@reduxjs/toolkit';
import exchangeRatesReducer from './exchangeRatesSlice.js';

const store = configureStore({
  reducer: {
    exchangeRates: exchangeRatesReducer,
  },
});

export default store;
