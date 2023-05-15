import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Header from './pages/Header.jsx';

const CurrencyConverter = lazy(() => import('./pages/CurrencyConverter'));
const ExchangeRates = lazy(() => import('./pages/ExchangeRates'));

function AppRoutes() {
  return (
    <div className="page">
      <Router>
        <Header />
        <div className="main">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/exchange" element={<ExchangeRates />} />
              <Route path="/convert" element={<CurrencyConverter />} />
              <Route path="/" element={<Navigate to="/convert" replace />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </div>
  );
}

export default AppRoutes;
