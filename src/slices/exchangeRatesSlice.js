import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { combiner } from '../utils/combiner.js';

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchExchangeRates = createAsyncThunk(
  'exchangeRates/fetchExchangeRates',
  async (base = 'United States Dollar') => {
    const ratesResponse = await fetch(
      `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`,
    );
    const ratesData = await ratesResponse.json();

    const currenciesResponse = await fetch('https://openexchangerates.org/api/currencies.json');
    const currenciesData = await currenciesResponse.json();

    let combinedData = {
      base: ratesData.base,
      rates: combiner(currenciesData, ratesData.rates) ?? null,
    };

    if (base !== 'United States Dollar') {
      const baseRateInUSD = combinedData.rates[base];
      combinedData = {
        base: base,
        rates: Object.fromEntries(
          Object.entries(combinedData.rates).map(([currency, rate]) => [
            currency,
            rate / baseRateInUSD,
          ]),
        ),
      };
    }

    return combinedData;
  },
);

const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState: { data: {}, status: 'idle', error: null, base: 'United States Dollar' },
  reducers: {
    changeBase: (state, action) => {
      state.base = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { changeBase } = exchangeRatesSlice.actions;
export default exchangeRatesSlice.reducer;
