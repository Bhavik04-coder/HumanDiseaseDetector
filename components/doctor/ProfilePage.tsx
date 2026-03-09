'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Award, Calendar, Check, Edit2 } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 123-4567',
    location: 'City General Hospital, New York',
    license: 'MD-12345-NY',
    experience: '15 Years',
    certifications: 'ABIM, FACC',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col items-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                alt={profile.name}
                className="w-32 h-32 rounded-full mb-4"
              />
              {isEditing ? (
                <div className="w-full space-y-2 mb-4">
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-center text-xl font-bold text-gray-900 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="specialty"
                    value={profile.specialty}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-center text-gray-600 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h2>
                  <p className="text-gray-600 mb-4">{profile.specialty}</p>
                </>
              )}
              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Online
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  Verified
                </span>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ${isEditing
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  }`}
              >
                {isEditing ? <><Check className="w-5 h-5" /> Save Changes</> : <><Edit2 className="w-5 h-5" /> Edit Profile</>}
              </button>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold text-gray-900">{profile.email}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold text-gray-900">{profile.phone}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div className="w-full">
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold text-gray-900">{profile.location}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Professional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <p className="text-sm text-gray-600">License Number</p>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="license"
                    value={profile.license}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-semibold text-gray-900">{profile.license}</p>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-gray-600">Years of Experience</p>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="experience"
                    value={profile.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-semibold text-gray-900">{profile.experience}</p>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-purple-600" />
                  <p className="text-sm text-gray-600">Specialization</p>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="specialty" // Maps to the same state as title specialty
                    value={profile.specialty}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-semibold text-gray-900">{profile.specialty}</p>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-orange-600" />
                  <p className="text-sm text-gray-600">Certifications</p>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="certifications"
                    value={profile.certifications}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-semibold text-gray-900">{profile.certifications}</p>
                )}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <p className="text-blue-100 mb-2">Total Patients</p>
              <p className="text-4xl font-bold">1,284</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
              <p className="text-green-100 mb-2">Success Rate</p>
              <p className="text-4xl font-bold">96.8%</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <p className="text-purple-100 mb-2">Consultations</p>
              <p className="text-4xl font-bold">3,456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
