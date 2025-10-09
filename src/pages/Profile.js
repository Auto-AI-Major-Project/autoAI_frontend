import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Pencil, LogOut, Check, X } from 'lucide-react';
import axios from 'axios';
const BASE_URL = process.env.BASE_URL || 'http://localhost:8000';

// Move Field component outside to prevent recreation
const Field = React.memo(({ id, label, type = 'text', editing, value, onChange }) => (
  <div className="mb-4">
    <div className="text-xs text-slate-500 mb-1">{label}</div>
    <div className="flex items-center gap-2">
      {editing ? (
        <input
          type={type}
          value={value || ''}
          onChange={onChange}
          className="px-3 py-2 rounded-xl border w-full focus:outline-none focus:ring-2 focus:ring-[#1A6B8E] focus:border-transparent"
        />
      ) : (
        <div className="px-3 py-2 rounded-xl border bg-slate-50 w-full">
          {value || ''}
        </div>
      )}
    </div>
  </div>
));

export default function Profile() {
  const { profile, setProfile } = useApp();
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  // Memoized change handlers to prevent recreation
  const handleUsernameChange = useCallback((e) => {
    setEditData(prev => ({ ...prev, username: e.target.value }));
  }, []);

  const handleEmailChange = useCallback((e) => {
    setEditData(prev => ({ ...prev, email: e.target.value }));
  }, []);

  const handleProfessionChange = useCallback((e) => {
    setEditData(prev => ({ ...prev, profession: e.target.value }));
  }, []);

  const handleCompanyChange = useCallback((e) => {
    setEditData(prev => ({ ...prev, company: e.target.value }));
  }, []);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found in localStorage');
          setError('Please sign in to view your profile');
          navigate('/signin');
          return;
        }

        console.log('Fetching profile with token:', token.substring(0, 20) + '...'); // Log partial token
        const response = await axios.get(`${BASE_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Profile fetched:', response.data);
        setProfile(response.data);
        setEditData(response.data); // Initialize edit data
        setError('');
      } catch (error) {
        console.error('Profile fetch error:', error.response?.data || error.message);
        if (error.response?.status === 401) {
          setError('Unauthorized. Please sign in again.');
          localStorage.removeItem('token');
          navigate('/signin');
        } else if (error.response?.status === 404) {
          setError('User not found. Please sign in again.');
          localStorage.removeItem('token');
          navigate('/signin');
        } else {
          setError(error.response?.data?.message || 'Failed to fetch profile');
        }
      }
    };

    fetchProfile();
  }, [setProfile, navigate]);

  const handleLogOut = () => {
    console.log('Logging out, removing token');
    localStorage.removeItem('token');
    setProfile({});
    navigate('/');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size must be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        if (editing) {
          setEditData((p) => ({ ...p, profileImage: reader.result }));
        } else {
          setProfile((p) => ({ ...p, profileImage: reader.result }));
        }
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found for profile update');
        setError('Please sign in to update your profile');
        navigate('/signin');
        return;
      }

      console.log('Updating profile with data:', {
        username: editData.username,
        email: editData.email,
        profession: editData.profession,
        company: editData.company,
        profileImage: editData.profileImage ? 'Base64 image' : null,
      });
      const response = await axios.put(
        `${BASE_URL}/api/auth/profile`,
        {
          username: editData.username,
          email: editData.email,
          profession: editData.profession,
          company: editData.company,
          profileImage: editData.profileImage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update the main profile state with the saved data
      setProfile(editData);
      setSuccess('Profile updated successfully!');
      setEditing(false);
      setSelectedImage(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Profile update error:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        setError('Unauthorized. Please sign in again.');
        localStorage.removeItem('token');
        navigate('/signin');
      } else if (error.response?.status === 404) {
        setError('User not found. Please sign in again.');
        localStorage.removeItem('token');
        navigate('/signin');
      } else {
        setError(error.response?.data?.message || 'Failed to update profile');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditData({ ...profile }); // Reset edit data to original profile data
    setSelectedImage(null);
  };

  const handleStartEdit = () => {
    setEditing(true);
    setEditData({ ...profile }); // Copy current profile data to edit state
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 p-6 rounded-2xl bg-white border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#1A6B8E]">Profile</h2>
          {editing ? (
            <div className="flex gap-2">
              <button 
                onClick={handleSaveChanges} 
                className="p-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors"
                title="Save Changes"
              >
                <Check size={16} />
              </button>
              <button 
                onClick={handleCancelEdit} 
                className="p-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
                title="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleStartEdit} 
              className="p-2 rounded-xl border hover:bg-slate-50 transition-colors"
              title="Edit Profile"
            >
              <Pencil size={16} />
            </button>
          )}
        </div>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        
        <Field 
          id="username" 
          label="Username" 
          editing={editing}
          value={editing ? editData.username : profile.username}
          onChange={handleUsernameChange}
        />
        <Field 
          id="email" 
          label="Email" 
          editing={editing}
          value={editing ? editData.email : profile.email}
          onChange={handleEmailChange}
        />
        <Field 
          id="profession" 
          label="Profession" 
          editing={editing}
          value={editing ? editData.profession : profile.profession}
          onChange={handleProfessionChange}
        />
        <Field 
          id="company" 
          label="Company" 
          editing={editing}
          value={editing ? editData.company : profile.company}
          onChange={handleCompanyChange}
        />
        
        <div className="flex gap-3 mt-6">
          <button onClick={handleLogOut} className="px-4 py-2 rounded-xl border hover:bg-slate-50 transition-colors">
            Log Out <LogOut size={14} className="inline ml-2" />
          </button>
        </div>
      </div>
      <div className="p-6 rounded-2xl bg-white border shadow-sm flex flex-col items-center">
        <div className="relative">
          <img
            src={(editing ? editData.profileImage : profile.profileImage) || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(profile.username || 'User')}`}
            alt="Profile"
            className="w-32 h-32 rounded-2xl border"
          />
          <label htmlFor="profileImage" className="absolute -right-2 -bottom-2 p-2 rounded-xl border bg-white shadow cursor-pointer hover:bg-slate-50 transition-colors">
            <Pencil size={14} />
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <button className="mt-4 px-4 py-2 rounded-xl border hover:bg-slate-50 transition-colors">
          View Previous Projects
        </button>
      </div>
    </div>
  );
}