'use client';

import { useState } from 'react';
import { Activity, Heart, Droplets, UserSquare2, TrendingUp, Thermometer, Plus, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDoctorState } from './DoctorStateContext';

export default function ProgressTracker() {
  const { patients, metrics, setMetrics } = useDoctorState();
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [showVitalsModal, setShowVitalsModal] = useState(false);
  const [newVitals, setNewVitals] = useState({ date: new Date().toISOString().split('T')[0], heartRate: '', bpSys: '', bpDia: '', glucose: '', temp: '' });
  
  // Find current selected patient or fallback to first
  const currentPatient = patients.find(p => p.id.toString() === selectedPatientId) || patients[0];

  // Get metrics for the selected patient, sorted by date (newest first)
  const patientMetrics = metrics
    .filter(m => m.patientId === currentPatient?.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const latestMetric = patientMetrics[0];

  const handleSaveVitals = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPatient) return;

    const metric: any = {
      id: `M${Date.now()}`,
      patientId: currentPatient.id,
      date: newVitals.date,
      heartRate: parseInt(newVitals.heartRate) || 0,
      bloodPressure: {
        systolic: parseInt(newVitals.bpSys) || 0,
        diastolic: parseInt(newVitals.bpDia) || 0
      },
      glucose: parseInt(newVitals.glucose) || 0,
      temperature: parseFloat(newVitals.temp) || 0
    };

    setMetrics(prev => [metric, ...prev]);
    setShowVitalsModal(false);
    setNewVitals({ date: new Date().toISOString().split('T')[0], heartRate: '', bpSys: '', bpDia: '', glucose: '', temp: '' });
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[#0f172a] text-white p-6 md:p-8 rounded-[2rem] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/30">
            <Activity className="w-4 h-4" /> Predictive Analytics
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Telemetry</span></h1>
          <p className="text-slate-400 font-medium text-lg">Real-time health tracking and AI-powered vital insights.</p>
        </div>
        
        <div className="w-full md:w-[400px] flex gap-3 items-end">
          <div className="flex-1">
            <label className="text-slate-400 text-sm font-semibold mb-2 block uppercase tracking-wider">Select Patient</label>
            <div className="relative">
              <select
                value={selectedPatientId || (currentPatient ? currentPatient.id.toString() : '')}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full appearance-none bg-slate-800/80 backdrop-blur-md border border-slate-700 text-white font-bold py-4 pl-14 pr-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl cursor-pointer"
              >
                {patients.length > 0 ? patients.map(p => <option className="bg-slate-800 text-white" key={p.id} value={p.id}>{p.name}</option>) : <option value="">No patients available</option>}
              </select>
              <UserSquare2 className="absolute left-5 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowVitalsModal(true)}
            className="h-14 px-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-900/50 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" /> Log Vitals
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Core Vitals Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Heart Rate Widget */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all duration-500" />
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-slate-400 font-semibold text-xs tracking-widest uppercase mb-1">Heart Rate</p>
                  <div className="flex items-end gap-2">
                    <h2 className="text-5xl font-black text-white">{latestMetric?.heartRate || '--'}</h2>
                    <span className="text-slate-500 font-bold mb-1">bpm</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400 border border-rose-500/30">
                  <Heart className="w-6 h-6 animate-pulse" />
                </div>
              </div>
              
              {/* Historical Context Text */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-slate-500 text-xs">Based on {patientMetrics.length} recorded data points.</span>
              </div>
            </div>

            {/* Blood Pressure Widget */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500" />
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-slate-400 font-semibold text-xs tracking-widest uppercase mb-1">Blood Pressure</p>
                  <div className="flex items-end gap-2">
                    <h2 className="text-5xl font-black text-white">
                        {latestMetric?.bloodPressure ? `${latestMetric.bloodPressure.systolic}/${latestMetric.bloodPressure.diastolic}` : '--/--'}
                    </h2>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                  <Activity className="w-6 h-6" />
                </div>
              </div>
              
              {/* Historical Context Text */}
              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Latest recording from {latestMetric?.date ? new Date(latestMetric.date).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Glucose Card */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 relative">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
                  <Droplets className="w-5 h-5" />
                </div>
              </div>
              <p className="text-slate-400 font-semibold text-sm mb-1 uppercase tracking-wider">Blood Glucose</p>
              <h2 className="text-3xl font-bold text-white mb-1">{latestMetric?.glucose || '--'} <span className="text-sm text-slate-500">mg/dL</span></h2>
              <p className="text-xs text-slate-400 mt-2">{latestMetric?.glucose ? `Latest recorded on ${new Date(latestMetric.date).toLocaleDateString()}` : 'No records yet'}</p>
            </div>

            {/* Temperature Card */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 relative">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 mb-2">
                  <Thermometer className="w-5 h-5" />
                </div>
              </div>
              <p className="text-slate-400 font-semibold text-sm mb-1 uppercase tracking-wider">Body Temp</p>
              <h2 className="text-3xl font-bold text-white mb-1">{latestMetric?.temperature || '--'} <span className="text-sm text-slate-500">°F</span></h2>
              <p className="text-xs text-slate-400 mt-2">{latestMetric?.temperature ? `Latest recorded on ${new Date(latestMetric.date).toLocaleDateString()}` : 'No records yet'}</p>
            </div>

          </div>
        </div>

        {/* Interactive Chart Section */}
        <div className="lg:col-span-12 flex flex-col gap-6">
          <div className="flex-1 bg-gradient-to-b from-blue-900/40 to-slate-900/80 backdrop-blur-2xl border border-blue-500/20 rounded-3xl p-8 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] animate-pulse" />
              <h3 className="font-bold text-xl text-white tracking-wide">Historical Vitals Breakdown</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Heart Rate Graph */}
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                <h4 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-400" /> Heart Rate (bpm)
                </h4>
                <div className="w-full h-[250px]">
                  {patientMetrics.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[...patientMetrics].reverse()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorHeartRate" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickMargin={10} />
                        <YAxis stroke="#94a3b8" fontSize={12} domain={['dataMin - 5', 'dataMax + 5']} />
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }} itemStyle={{ color: '#f43f5e' }} />
                        <Area type="monotone" name="Heart Rate" dataKey="heartRate" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorHeartRate)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-slate-500 text-sm">No data available.</div>
                  )}
                </div>
              </div>

              {/* Glucose Graph */}
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                <h4 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-purple-400" /> Blood Glucose (mg/dL)
                </h4>
                <div className="w-full h-[250px]">
                  {patientMetrics.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[...patientMetrics].reverse()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickMargin={10} />
                        <YAxis stroke="#94a3b8" fontSize={12} domain={['dataMin - 10', 'dataMax + 10']} />
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }} itemStyle={{ color: '#a855f7' }} />
                        <Area type="monotone" name="Glucose" dataKey="glucose" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorGlucose)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-slate-500 text-sm">No data available.</div>
                  )}
                </div>
              </div>

              {/* Blood Pressure Graph */}
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                <h4 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400" /> Blood Pressure (mmHg)
                </h4>
                <div className="w-full h-[250px]">
                  {patientMetrics.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart 
                        data={[...patientMetrics].reverse().map(m => ({ ...m, systolic: m.bloodPressure.systolic, diastolic: m.bloodPressure.diastolic }))} 
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorBP" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickMargin={10} />
                        <YAxis stroke="#94a3b8" fontSize={12} domain={['dataMin - 10', 'dataMax + 10']} />
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }} />
                        <Area type="monotone" name="Systolic" dataKey="systolic" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBP)" />
                        <Area type="monotone" name="Diastolic" dataKey="diastolic" stroke="#60a5fa" strokeWidth={3} fillOpacity={0.5} fill="url(#colorBP)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-slate-500 text-sm">No data available.</div>
                  )}
                </div>
              </div>

              {/* Temperature Graph */}
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                <h4 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-orange-400" /> Temperature (°F)
                </h4>
                <div className="w-full h-[250px]">
                  {patientMetrics.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[...patientMetrics].reverse()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickMargin={10} />
                        <YAxis stroke="#94a3b8" fontSize={12} domain={[96, 102]} />
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }} itemStyle={{ color: '#f97316' }} />
                        <Area type="monotone" name="Temperature" dataKey="temperature" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-slate-500 text-sm">No data available.</div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>


      </div>

      {/* Log Vitals Modal */}
      <AnimatePresence>
        {showVitalsModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-[2rem] p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setShowVitalsModal(false)}
                className="absolute top-6 right-6 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-2xl font-black text-white mb-2">Log Vitals</h2>
              <p className="text-slate-400 mb-8">Record health metrics for {currentPatient?.name || 'the patient'}.</p>
              
              <form onSubmit={handleSaveVitals} className="space-y-5">
                
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Date of Recording</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      value={newVitals.date}
                      onChange={e => setNewVitals({...newVitals, date: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 pl-12 focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                   <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Heart Rate (bpm)</label>
                      <input 
                        type="number" 
                        value={newVitals.heartRate}
                        onChange={e => setNewVitals({...newVitals, heartRate: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. 76"
                      />
                   </div>
                   <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Temperature (°F)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={newVitals.temp}
                        onChange={e => setNewVitals({...newVitals, temp: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. 98.6"
                      />
                   </div>
                </div>

                <div>
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Blood Pressure (mmHg)</label>
                   <div className="flex items-center gap-3">
                      <input 
                        type="number" 
                        value={newVitals.bpSys}
                        onChange={e => setNewVitals({...newVitals, bpSys: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Systolic"
                      />
                      <span className="text-slate-500 font-bold text-xl">/</span>
                      <input 
                        type="number" 
                        value={newVitals.bpDia}
                        onChange={e => setNewVitals({...newVitals, bpDia: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Diastolic"
                      />
                   </div>
                </div>

                <div>
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Blood Glucose (mg/dL)</label>
                   <input 
                     type="number" 
                     value={newVitals.glucose}
                     onChange={e => setNewVitals({...newVitals, glucose: e.target.value})}
                     className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                     placeholder="e.g. 105"
                   />
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-800 mt-6">
                  <button 
                    type="submit"
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/50 transition-all flex items-center gap-2"
                  >
                    Save Vitals
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
