// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import HotelBooking from './pages/HotelBooking';
import FlightBooking from './pages/FlightBooking';
import CabBooking from './pages/CabBooking';

// Import the HoneymoonPackages component
import HoneymoonPackages from './components/HoneymoonPackages';

// Placeholder components for new routes
const Anniversary = () => <div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Anniversary Packages</h1><p className="mt-4">Special packages for your anniversary celebrations.</p></div>;
const Birthday = () => <div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Birthday Packages</h1><p className="mt-4">Make your birthday special with our exclusive packages.</p></div>;
const Festival = () => <div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Festival Packages</h1><p className="mt-4">Celebrate festivals with our special travel packages.</p></div>;
const Domestic = () => (
  <div className="py-8">
    <HoneymoonPackages />
  </div>
);
const International = () => <div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">International Destinations</h1><p className="mt-4">Discover amazing places around the world.</p></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="hotel" element={<Navigate to="/hotel-booking" replace />} />
          <Route path="hotel-booking" element={<HotelBooking />} />
          
          <Route path="flight" element={<Navigate to="/flight-booking" replace />} />
          <Route path="flight-booking" element={<FlightBooking />} />
          
          <Route path="cab" element={<Navigate to="/cab-booking" replace />} />
          <Route path="cab-booking" element={<CabBooking />} />
          
          <Route path="anniversary" element={<Anniversary />} />
          <Route path="birthday" element={<Birthday />} />
          <Route path="festival" element={<Festival />} />
          <Route path="domestic" element={<Domestic />} />
          <Route path="international" element={<International />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
