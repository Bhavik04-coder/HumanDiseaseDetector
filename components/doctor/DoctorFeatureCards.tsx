'use client';

import {
    Users,
    Brain,
    Calendar,
    Video,
    ActivitySquare,
    FlaskConical,
    FileText
} from 'lucide-react';

const doctorFeatures = [
    {
        id: 'patients',
        title: 'Patient Management',
        description: 'Access complete clinical records, export PDF reports, and view historical insights.',
        icon: Users,
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600'
    },
    {
        id: 'ai-predictions',
        title: 'AI Predictions',
        description: 'Run real-time ML diagnostic models and validate algorithmic health assessments.',
        icon: Brain,
        color: 'from-fuchsia-500 to-purple-600',
        bgColor: 'bg-fuchsia-50',
        iconColor: 'text-fuchsia-600'
    },
    {
        id: 'appointments',
        title: 'Appointments',
        description: 'Schedule follow-ups and manage your daily clinic patient flow effectively.',
        icon: Calendar,
        color: 'from-emerald-500 to-teal-600',
        bgColor: 'bg-emerald-50',
        iconColor: 'text-emerald-600'
    },
    {
        id: 'consult-doctors',
        title: 'Telemedicine Hub',
        description: 'Initiate secure, high-definition Jitsi video consultations with remote patients.',
        icon: Video,
        color: 'from-orange-500 to-red-500',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-600'
    },
    {
        id: 'progress-tracker',
        title: 'Progress Tracker',
        description: 'Monitor long-term vital statistic trends visually for chronic care patients.',
        icon: ActivitySquare,
        color: 'from-cyan-500 to-blue-500',
        bgColor: 'bg-cyan-50',
        iconColor: 'text-cyan-600'
    },
    {
        id: 'lab-pathology',
        title: 'Lab & Pathology',
        description: 'Order specific laboratory tests and instantly review uploaded pathology results.',
        icon: FlaskConical,
        color: 'from-rose-500 to-pink-600',
        bgColor: 'bg-rose-50',
        iconColor: 'text-rose-600'
    },
    {
        id: 'prescriptions',
        title: 'Digital Prescriptions',
        description: 'Generate standardized PDF scripts and instantly route them to the active pharmacy.',
        icon: FileText,
        color: 'from-indigo-500 to-blue-600',
        bgColor: 'bg-indigo-50',
        iconColor: 'text-indigo-600'
    }
];

export default function DoctorFeatureCards({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
    return (
        <section className="relative pb-24 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Clinical Toolset</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto md:mx-0">
                        Access your core medical modules to provide exceptional, AI-augmented care.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {doctorFeatures.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.id}
                                onClick={() => setActiveTab(feature.id)}
                                className="group relative cursor-pointer outline-none bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-blue-100 transition-all duration-300 flex flex-col items-start h-full"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Decorative background gradient that appears on hover */}
                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`}></div>

                                <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                    <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed text-sm flex-grow mb-6">
                                    {feature.description}
                                </p>

                                <div className="mt-auto w-full inline-flex items-center text-sm font-semibold text-gray-500 group-hover:text-blue-600 transition-colors">
                                    Open Module
                                    <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
