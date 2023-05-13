export const converter = (amount, fromCurrency, toCurrency, exchangeRates) => {
  if (!amount || !fromCurrency || !toCurrency || !exchangeRates) {
    return '';
  }

  const fromRate = exchangeRates[fromCurrency];
  const toRate = exchangeRates[toCurrency];

  if (!fromRate || !toRate) {
    return '';
  }

  const baseAmount = amount / fromRate;
  const convertedAmount = baseAmount * toRate;

  return convertedAmount.toFixed(2);
};
