import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, LogOut, Settings, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
const {logout} = useAuth();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
    }
  }, []);

  const handleLogout = () => {
    logout()
  };

  const formatJoinDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-gray-500" />
          </div>
          <p className="text-gray-700 text-lg font-medium">No user data found</p>
          <p className="text-gray-500 text-sm mt-2">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20 transform hover:scale-[1.02] transition-all duration-300">
          
          {/* Header with Gradient Background */}
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 px-6 py-10 text-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-4 -translate-x-4"></div>
            
            {/* Settings & Logout Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                className="bg-white/20 hover:bg-white/30 transition-all duration-200 rounded-full p-2 backdrop-blur-sm transform hover:scale-110"
                title="Settings"
              >
                <Settings size={16} />
              </button>
              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-red-500/80 transition-all duration-200 rounded-full p-2 backdrop-blur-sm transform hover:scale-110"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>

            <div className="relative z-10 text-center">
              {/* Profile Picture with Animation */}
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm overflow-hidden border-4 border-white/30 shadow-lg transform hover:scale-105 transition-transform duration-300">
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={32} className="text-white/70" />
                    </div>
                  )}
                </div>
                {/* Online Status Indicator */}
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-400 rounded-full border-3 border-white shadow-md animate-pulse"></div>
                {/* Edit Button */}
                <button className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transform hover:scale-110 transition-all duration-200">
                  <Edit size={12} />
                </button>
              </div>

              {/* Name with Animation */}
              <h1 className="text-2xl font-bold mb-2 animate-fade-in">
                {userData.fullName || 'User'}
              </h1>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Online</span>
              </div>

              {/* Description */}
              {userData.description && (
                <p className="text-white/90 text-sm leading-relaxed max-w-xs mx-auto">
                  {userData.description}
                </p>
              )}
            </div>
          </div>

          {/* Details Section with Enhanced Design */}
          <div className="p-6 space-y-4">
            {/* Email */}
            <div className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <Mail size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Email Address</p>
                <p className="text-gray-800 font-medium">{userData.email || 'Not provided'}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <Phone size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Mobile Number</p>
                <p className="text-gray-800 font-medium">{userData.mobileNumber || 'Not provided'}</p>
              </div>
            </div>

            {/* Join Date */}
            <div className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <Calendar size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Member Since</p>
                <p className="text-gray-800 font-medium">{formatJoinDate(userData.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 pt-0 space-y-3">
            {/* Edit Profile Button */}
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
              <Edit size={18} />
              Edit Profile
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-2xl font-bold text-blue-600 mb-1">42</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Chats</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-2xl font-bold text-green-600 mb-1">128</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Messages</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-2xl font-bold text-purple-600 mb-1">15</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Friends</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;