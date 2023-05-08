import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchExchangeRates = createAsyncThunk('exchangeRates/fetchExchangeRates', async () => {
  const ratesResponse = await fetch(
    `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`,
  );
  const ratesData = await ratesResponse.json();

  const currenciesResponse = await fetch('https://openexchangerates.org/api/currencies.json');
  const currenciesData = await currenciesResponse.json();

  const combinedData = {
    base: ratesData.base,
    rates: ratesData.rates,
    currencies: currenciesData,
  };

  console.log(combinedData);

  return combinedData;
});

const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState: { data: {}, status: 'idle', error: null },
  reducers: {},
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

export default exchangeRatesSlice.reducer;
