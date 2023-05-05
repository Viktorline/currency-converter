import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchExchangeRates = createAsyncThunk('exchangeRates/fetchExchangeRates', async () => {
  const response = await fetch('https://api.frankfurter.app/latest');
  const data = await response.json();
  console.log('update!');
  console.log(data);
  return data;
});

const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState: { data: {}, status: 'idle', error: null, baseCurrency: 'EUR' },
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
