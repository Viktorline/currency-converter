# Currency Converter

This is a simple Currency Converter app built as a part of the frontend intern test task for AppBooster. The app allows you to convert amounts between different currencies and view current exchange rates. 

https://currency-converter-three-kappa.vercel.app/convert

## Features

- Conversion between various currencies.
- Displays current exchange rates for selected base currency.
- Responsive design for mobile and desktop viewing.
- Exchange rates are updated once a day.

## Technologies Used

- React.js
- Redux
- Ant Design UI Library
- API: https://openexchangerates.org/api
- SASS

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/Viktorline/currency-converter.git
``` 
2. Navigate to the project directory:
```bash
cd currency-converter
``` 
3. Install the dependencies:
```bash
npm install
``` 
4. Start the development server:
```bash
npm start
``` 

The application should now be running on http://localhost:3000 (or the port you have configured)

### Environment Variables
To run this project, you will need to add the following environment variables to your .env file:
```bash
REACT_APP_API_KEY: Your API key #You can get it https://openexchangerates.org/api.
``` 