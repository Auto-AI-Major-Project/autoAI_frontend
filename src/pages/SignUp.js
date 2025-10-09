import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const BASE_URL = process.env.BASE_URL || 'http://localhost:8000';

export default function SignUp() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
    setSuccess(''); // Clear success on input change
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, formData);
      localStorage.setItem('token', response.data.token); // Store JWT token
      setSuccess('Account created successfully!');
      setTimeout(() => nav('/'), 1500); // Redirect after 1.5s
    } catch (error) {
      setError(error.response?.data?.message || 'Server error, please try again later');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-sm border">
      <h2 className="text-2xl font-bold text-[#1A6B8E]">Sign Up</h2>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
      <div className="mt-4 space-y-3">
        <input
          className="w-full px-4 py-3 rounded-xl border"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          className="w-full px-4 py-3 rounded-xl border"
          placeholder="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="w-full px-4 py-3 rounded-xl border"
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          className="w-full px-4 py-3 rounded-xl border"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-[#1A6B8E] text-white hover:bg-[#135d7a] transition"
        >
          Create Account
        </button>
      </div>
      <div className="text-center text-xs text-slate-500 mt-4">
        Made by the students of <span className="font-semibold">MIT College, Chh.Sambahjinagar</span>
      </div>
    </div>
  );
}