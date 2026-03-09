'use client';

import { Activity, Users, Calendar, ArrowRight } from 'lucide-react';
import { PulsePattern } from '@/components/ui/BackgroundPatterns';

export default function DoctorHero({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
    return (
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden rounded-b-[3rem] border-b border-white/20 mb-12 shadow-sm bg-gradient-to-br from-blue-50/80 via-white/50 to-teal-50/80 backdrop-blur-sm">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-300/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                    {/* Welcome Text Left */}
                    <div className="flex-1 space-y-8 animate-fade-in text-center md:text-left">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-blue-200/50 shadow-sm mx-auto md:mx-0">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium text-gray-700">Dhanvantari AI Doctor Portal</span>
                        </div>

                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-gray-900 tracking-tight">
                            Welcome back, <br />
                            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-blue-700 bg-clip-text text-transparent">
                                Dr. Sarah Johnson
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
                            Your intelligent clinical workspace. Review AI predictions, manage patient critical care, and access live pathology results.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
                            <button
                                onClick={() => setActiveTab('appointments')}
                                className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                                <span>Today's Schedule</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => setActiveTab('patients')}
                                className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-md transition-all duration-300"
                            >
                                Find Patient
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats Right */}
                    <div className="flex-1 w-full max-w-md animate-fade-in" style={{ animationDelay: '150ms' }}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Stat Card 1 */}
                            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/60 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-blue-100 rounded-xl">
                                        <Users className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500">Total Patients</h3>
                                        <p className="text-2xl font-bold text-gray-900">1,248</p>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full w-[70%]"></div></div>
                            </div>

                            {/* Stat Card 2 */}
                            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/60 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-teal-100 rounded-xl">
                                        <Calendar className="w-6 h-6 text-teal-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500">Appointments</h3>
                                        <p className="text-2xl font-bold text-gray-900">12 Today</p>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-teal-500 h-1.5 rounded-full w-[45%]"></div></div>
                            </div>

                            {/* Stat Card 3 (Full width) */}
                            <div className="sm:col-span-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-6 shadow-md text-white relative overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('ai-predictions')}>
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative z-10 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                            <Activity className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-blue-100">AI Predictions Run</h3>
                                            <p className="text-2xl font-bold text-white flex items-baseline gap-2">
                                                84 <span className="text-xs font-normal text-teal-100">this week</span>
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
