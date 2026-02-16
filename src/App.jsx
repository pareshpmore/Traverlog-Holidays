// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PackageDetail from './pages/PackageDetail';
import Anniversary from './pages/Anniversary';
import Birthday from './pages/Birthday';
import Festival from './pages/Festival';
import HotelBooking from './pages/HotelBooking';
import FlightBooking from './pages/FlightBooking';
import CabBooking from './pages/CabBooking';
import HoneymoonPackages from './components/HoneymoonPackages';
import AdminDashboard from './pages/admin/AdminDashboard';
import DashboardHome from './pages/admin/DashboardHome';
import Users from './pages/admin/Users';
import Settings from './pages/admin/Settings';
import Packages from './pages/admin/Packages';
import CreatePackage from './pages/admin/CreatePackage';
import EditPackage from './pages/admin/EditPackage';
import CategoryPackages from "./pages/CategoryPackages";


// Placeholder component
const Domestic = () => (
  <div className="py-8">
    <HoneymoonPackages />
  </div>
);

const International = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold">International Destinations</h1>
    <p className="mt-4">Discover amazing places around the world.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
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
            <Route path="package/:slug" element={<PackageDetail />} />
            <Route path=":category" element={<CategoryPackages />} />
            <Route path=":category/:type" element={<CategoryPackages />} />
            
            {/* Protected Admin Routes */}
            <Route path="admin" element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="users" element={<Users />} />
              <Route path="packages">
                <Route index element={<Packages />} />
                <Route path="new" element={<CreatePackage />} />
                <Route path=":id" element={<EditPackage />} />
              </Route>
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>
            
            {/* Future Checkout Route (Protected) */}
            <Route 
              path="checkout" 
              element={
                <ProtectedRoute>
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6">Checkout</h1>
                    <p>Checkout page will be implemented here.</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route for non-existent admin paths */}
            <Route path="admin/*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Routes>
    </AuthProvider>
  );
}

export default App;
