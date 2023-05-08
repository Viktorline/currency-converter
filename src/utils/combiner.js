export const combiner = (currencies, rates) => {
  const combinedData = {};

  for (const currencyCode in rates) {
    const currencyName = currencies[currencyCode];
    if (currencyName) {
      combinedData[currencyName] = rates[currencyCode];
    } else {
      combinedData[currencyCode] = rates[currencyCode];
    }
  }

  return combinedData;
};
