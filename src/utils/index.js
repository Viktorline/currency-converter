export const convertCurrency = (amount, fromCurrency, toCurrency, exchangeRates) => {
  if (amount && fromCurrency && toCurrency && exchangeRates) {
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    const convertedAmount = (amount * toRate) / fromRate;
    return convertedAmount.toFixed(2);
  }
  return '';
};
