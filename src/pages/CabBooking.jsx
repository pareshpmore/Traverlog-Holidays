// src/pages/CabBooking.jsx
import React, { useState } from 'react';

const CabBooking = () => {
  const [tripType, setTripType] = useState('one-way');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cab Booking</h1>
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
          <button
            onClick={() => setTripType('local')}
            className={`px-4 py-2 rounded-md ${
              tripType === 'local' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Local
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter pickup location"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Drop Location</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter drop location"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date & Time</label>
            <div className="flex">
              <input
                type="date"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                className="w-1/2 px-3 py-2 border-t border-b border-r border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Search Cabs
            </button>
          </div>
        </div>

        {tripType === 'round-trip' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Return Date & Time</label>
              <div className="flex">
                <input
                  type="date"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="time"
                  className="w-1/2 px-3 py-2 border-t border-b border-r border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Available Cabs</h2>
        <div className="space-y-6">
          {[
            {
              name: 'Hatchback',
              image: '/images/cabs/hatchback.jpg',
              price: '12',
              features: ['Upto 3 people', '2 Bags', 'AC', 'Free Cancellation'],
            },
            {
              name: 'Sedan',
              image: '/images/cabs/sedan.jpg',
              price: '15',
              features: ['Upto 4 people', '2 Bags', 'AC', 'Free Cancellation'],
            },
            {
              name: 'SUV',
              image: '/images/cabs/suv.jpg',
              price: '20',
              features: ['Upto 6 people', '4 Bags', 'AC', 'Free Cancellation'],
            },
          ].map((cab, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-48 h-48">
                  <img
                    className="h-full w-full object-cover"
                    src={cab.image}
                    alt={cab.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/placeholder-cab.jpg';
                    }}
                  />
                </div>
                <div className="p-6 flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{cab.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cab.features.map((feature, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold mb-1">₹{cab.price}/km</div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CabBooking;