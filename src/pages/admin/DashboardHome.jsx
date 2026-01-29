import React from 'react';

const DashboardHome = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">1,234</p>
          <p className="mt-2 text-sm text-gray-500">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Active Bookings</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">256</p>
          <p className="mt-2 text-sm text-gray-500">+8% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Revenue</h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">$24,780</p>
          <p className="mt-2 text-sm text-gray-500">+15% from last month</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
