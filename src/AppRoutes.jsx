import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

const CurrencyConverter = lazy(() => import('./pages/CurrencyConverter'));
const ExchangeRates = lazy(() => import('./pages/ExchangeRates'));

function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/exchange" element={<ExchangeRates />} />
          <Route path="/convert" element={<CurrencyConverter />} />
          <Route path="/" element={<Navigate to="/exchange" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
