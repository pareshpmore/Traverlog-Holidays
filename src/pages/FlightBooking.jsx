// src/pages/FlightBooking.jsx
import React, { useState } from 'react';
import { formatPrice } from '../utils/formatters';

const FlightBooking = () => {
  const [tripType, setTripType] = useState('one-way');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Flight Booking</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setTripType('one-way')}
            className={`px-4 py-2 rounded-md ${
              tripType === 'one-way' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            One Way
          </button>
          <button
            onClick={() => setTripType('round-trip')}
            className={`px-4 py-2 rounded-md ${
              tripType === 'round-trip' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Round Trip
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="City or Airport"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="City or Airport"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {tripType === 'round-trip' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Return</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Traveler' : 'Travelers'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Search Flights
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Popular Flight Routes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { from: 'Delhi', to: 'Mumbai', price: '3,499' },
            { from: 'Bangalore', to: 'Delhi', price: '4,299' },
            { from: 'Mumbai', to: 'Goa', price: '2,999' },
          ].map((route, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="font-medium">{route.from} → {route.to}</div>
                  <div className="text-sm text-gray-500">Non-stop</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">{formatPrice(route.price)}</div>
                  <div className="text-sm text-gray-500">One way</div>
                </div>
              </div>
              <button className="w-full mt-4 bg-blue-100 text-blue-600 py-2 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors">
                View Flights
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightBooking;