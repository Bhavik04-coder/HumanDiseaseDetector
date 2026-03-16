'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Mic, MicOff, Camera, CameraOff, PhoneOff, 
  MonitorUp, Users, Calendar, Activity, ChevronRight, 
  Settings, Maximize, MessageSquare, LayoutDashboard, ExternalLink
} from 'lucide-react';
import { useDoctorState } from './DoctorStateContext';

export default function ConsultDoctor() {
  const { appointments } = useDoctorState();
  const [inCall, setInCall] = useState(false);
  const [micActive, setMicActive] = useState(true);
  const [camActive, setCamActive] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const upcomingAppointments = appointments.filter(apt => apt.mode === 'Online');

  const handleStartMeeting = () => {
    // Open Google Meet in a new tab
    window.open('https://meet.google.com/new', '_blank');
  };

  if (inCall) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4 md:p-6"
      >
        <div className="relative w-full max-w-7xl h-full max-h-[90vh] bg-gray-900 rounded-[2rem] overflow-hidden shadow-2xl border border-gray-800 flex flex-col">
          {/* Header */}
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start p-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-red-500/20 text-red-500 px-3 py-1.5 rounded-full backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold tracking-wider">REC 00:12:45</span>
              </div>
              <div className="bg-gray-800/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium border border-gray-700/50">
                Encrypted Connection
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 bg-gray-800/60 hover:bg-gray-700/80 backdrop-blur-md text-white rounded-full transition-all">
                <LayoutDashboard className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-gray-800/60 hover:bg-gray-700/80 backdrop-blur-md text-white rounded-full transition-all">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Video Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 pt-20 pb-28">
            {/* Main Patient Video */}
            <div className="lg:col-span-3 relative bg-gray-800 rounded-3xl overflow-hidden border border-gray-700/50 group">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover" 
                alt="Patient" 
              />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    EP
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm leading-tight">Eleanor Pena</h3>
                    <p className="text-gray-400 text-xs">Patient</p>
                  </div>
                </div>
                <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-2 rounded-xl flex items-center justify-center">
                  <Mic className="w-5 h-5 text-gray-300" />
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              {/* Doctor Self View */}
              <div className="relative h-64 bg-gray-800 rounded-3xl overflow-hidden border border-gray-700/50">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80" 
                  className={`w-full h-full object-cover transition-opacity duration-300 ${!camActive ? 'opacity-20 blur-md' : 'opacity-100'}`} 
                  alt="Self" 
                />
                {!camActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center shadow-lg">
                      <CameraOff className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-xl text-white text-xs font-medium">
                  You
                </div>
              </div>

              {/* Live Vitals Tracker */}
              <div className="flex-1 bg-gray-800/80 backdrop-blur-2xl rounded-3xl border border-gray-700/50 p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400" /> Live Vitals
                </h3>
                
                <div className="space-y-4 relative z-10">
                  <div className="bg-gray-900/50 p-4 rounded-2xl border border-gray-700/50 flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Heart Rate</p>
                      <p className="text-2xl font-black text-rose-400">76 <span className="text-sm font-medium text-rose-500/50">bpm</span></p>
                    </div>
                    <div className="h-10 w-16">
                       <svg viewBox="0 0 100 30" width="100%" height="100%" preserveAspectRatio="none">
                          <polyline points="0,15 20,15 25,5 30,25 35,15 100,15" fill="none" stroke="#fb7185" strokeWidth="2" />
                       </svg>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-4 rounded-2xl border border-gray-700/50 flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">SpO2</p>
                      <p className="text-2xl font-black text-blue-400">98 <span className="text-sm font-medium text-blue-500/50">%</span></p>
                    </div>
                    <div className="w-8 h-8 rounded-full border-[3px] border-blue-400/20 border-t-blue-400 flex justify-center items-center">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Control Bar */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black to-transparent flex items-center justify-center pb-4 z-20">
            <div className="bg-gray-800/80 backdrop-blur-2xl border border-gray-700/50 px-8 py-3 rounded-full flex items-center gap-4 shadow-2xl">
              <button 
                onClick={() => setMicActive(!micActive)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  micActive 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20'
                }`}
              >
                {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={() => setCamActive(!camActive)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  camActive 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20'
                }`}
              >
                {camActive ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
              </button>

              <div className="w-px h-8 bg-gray-700 mx-2" />

              <button className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center transition-all">
                <MonitorUp className="w-5 h-5" />
              </button>

              <button className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center transition-all relative">
                <MessageSquare className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-gray-800" />
              </button>

              <button className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center transition-all">
                <Settings className="w-5 h-5" />
              </button>

              <div className="w-px h-8 bg-gray-700 mx-2" />

              <button 
                onClick={() => setInCall(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-500/25 hover:scale-105"
              >
                <PhoneOff className="w-5 h-5" /> End Session
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[#f8fafc] text-gray-900 p-8 rounded-[2rem]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Video className="w-4 h-4" /> Next-Gen Telehealth
          </motion.div>
          <h1 className="text-5xl font-black tracking-tight mb-2">Telemedicine <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Hub</span></h1>
          <p className="text-gray-500 font-medium text-lg">Manage virtual consultations with real-time patient telemetry.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right mr-4 hidden md:block">
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Current Time</p>
            <p className="text-2xl font-bold text-gray-900">{currentTime || 'Loading...'}</p>
          </div>
          <button 
            onClick={handleStartMeeting}
            className="group relative px-6 py-4 bg-gray-900 text-white font-bold rounded-2xl overflow-hidden shadow-xl shadow-gray-900/20 hover:shadow-2xl hover:shadow-gray-900/30 transition-all hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center gap-3">
              <ExternalLink className="w-5 h-5" />
              Start Google Meet
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
              <div className="relative">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-1">12</h3>
                <p className="text-gray-500 font-medium">Today's Patients</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
              <div className="relative">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-1">98%</h3>
                <p className="text-gray-500 font-medium">Connection Stability</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
              <div className="relative">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-1">4.9</h3>
                <p className="text-gray-500 font-medium">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 overflow-hidden flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Today's Schedule</h2>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button 
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${activeTab === 'upcoming' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Upcoming
                </button>
                <button 
                  onClick={() => setActiveTab('past')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${activeTab === 'past' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Past
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {upcomingAppointments.map((apt, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={apt.id} 
                    className="p-5 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        {apt.patientName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-700 transition-colors">{apt.patientName}</h3>
                        <p className="text-gray-500 text-sm font-medium">{apt.type}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 sm:gap-8 justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
                      <div className="text-left sm:text-right">
                        <p className="text-gray-900 font-bold">{apt.time}</p>
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mt-1 ${
                          apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' :
                          apt.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                      <button 
                        onClick={handleStartMeeting}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          idx === 0 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 group-hover:scale-110' 
                            : 'bg-gray-100 text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                        }`}
                      >
                        <Video className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Equipment Check Widget */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 text-white border border-gray-800 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-400" /> Equipment Readiness
            </h3>
            
            <div className="space-y-4 relative z-10">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">FaceTime HD Camera</p>
                    <p className="text-xs text-gray-400 mt-0.5">Connected • 1080p</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Studio Microphone</p>
                    <p className="text-xs text-gray-400 mt-0.5">Connected • Levels OK</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/20 rounded-xl text-yellow-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Network Latency</p>
                    <p className="text-xs text-gray-400 mt-0.5">45ms • Minor jitter</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
              </div>
            </div>
            
            <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl font-semibold text-sm border border-white/5">
              Run Diagnostics
            </button>
          </div>

          {/* Quick Notes */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex-1 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
              Before the call
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <p>Review <span className="font-bold text-gray-900">Eleanor Pena's</span> latest lab results uploaded at 8:00 AM.</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <p>Check telemetry sync status with the patient's wearable device.</p>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
