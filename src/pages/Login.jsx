// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaGoogle, FaPhone, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const Login = () => {
  const [activeTab, setActiveTab] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    login,
    signInWithGoogle,
    sendPhoneOtp,
    verifyPhoneOtp,
    initRecaptcha,
    isAuthenticated,
    userRole
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  // Initialize reCAPTCHA ONCE
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      initRecaptcha('recaptcha-container');
    }
  }, []);

  // Redirect after login
  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  }, [isAuthenticated, userRole, navigate, from]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!phone.startsWith('+')) {
      setError('Phone number must include country code (e.g. +91...)');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await sendPhoneOtp(phone);
      setOtpSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError('Enter the OTP');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await verifyPhoneOtp(otp);
      // redirect handled by useEffect
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

          {/* Tabs */}
          <div className="flex mb-6 border-b border-gray-200">
            {['email', 'phone', 'google'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-medium ${
                  activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
                }`}
              >
                {tab === 'email' && <FaEnvelope className="inline mr-2" />}
                {tab === 'phone' && <FaPhone className="inline mr-2" />}
                {tab === 'google' && <FaGoogle className="inline mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}

          {/* EMAIL */}
          {activeTab === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* PHONE */}
          {activeTab === 'phone' && (
            <div className="space-y-4">
              <input
                type="tel"
                placeholder="+91XXXXXXXXXX"
                value={phone}
                disabled={otpSent}
                onChange={e => setPhone(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />

              {otpSent && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full border px-3 py-2 rounded"
                />
              )}

              <button
                type="button"
                onClick={otpSent ? handleVerifyOtp : handleSendOtp}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                {loading ? 'Processing...' : otpSent ? 'Verify OTP' : 'Send OTP'}
              </button>
            </div>
          )}

          {/* GOOGLE */}
          {activeTab === 'google' && (
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center py-2 border rounded"
            >
              <FaGoogle className="mr-2 text-red-500" />
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </button>
          )}

          <div className="mt-6 text-center">
            <Link to="/register" className="text-blue-600">Create account</Link>
          </div>
        </div>
      </div>

      {/* reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Login;
