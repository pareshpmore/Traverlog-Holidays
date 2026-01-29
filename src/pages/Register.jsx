// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    setError('');
    try {
      await register(formData.email, formData.password, formData.name);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        {error && <div className="bg-red-100 text-red-700 p-2 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="w-full border px-3 py-2 rounded" />

          <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded">
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-600">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
