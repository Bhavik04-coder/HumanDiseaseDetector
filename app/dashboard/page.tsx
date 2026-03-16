'use client';

import { useState, useEffect } from 'react';
import { LogOut, ArrowLeft } from 'lucide-react';
import DoctorNavbar from '@/components/doctor/DoctorNavbar';
import DoctorHero from '@/components/doctor/DoctorHero';
import DoctorFeatureCards from '@/components/doctor/DoctorFeatureCards';
import DashboardOverview from '@/components/doctor/DashboardOverview';
import PatientManagement from '@/components/doctor/PatientManagement';
import AIPredictionReview from '@/components/doctor/AIPredictionReview';
import MedicineReview from '@/components/doctor/MedicineReview';
import ConsultDoctor from '@/components/doctor/ConsultDoctor';
import ProgressTracker from '@/components/doctor/ProgressTracker';
import PrescriptionGenerator from '@/components/doctor/PrescriptionGenerator';
import ReportsAnalytics from '@/components/doctor/ReportsAnalytics';
import AppointmentsPage from '@/components/doctor/AppointmentsPage';
import ProfilePage from '@/components/doctor/ProfilePage';
import SettingsPage from '@/components/doctor/SettingsPage';
import LabPathology from '@/components/doctor/LabPathology';
import NotificationsPage from '@/components/doctor/NotificationsPage';
import NeuralNetworkContainer from '@/components/ui/NeuralNetworkContainer';
import { DoctorStateProvider } from '@/components/doctor/DoctorStateContext';

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'patients':
        return <PatientManagement />;
      case 'ai-predictions':
        return <AIPredictionReview />;
      case 'medicine-reviews':
        return <MedicineReview />;
      case 'consult-doctors':
        return <ConsultDoctor />;
      case 'progress-tracker':
        return <ProgressTracker />;
      case 'prescriptions':
        return <PrescriptionGenerator />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'lab-pathology':
        return <LabPathology />;
      case 'appointments':
        return <AppointmentsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      case 'notifications':
        return <NotificationsPage />;
      default:
        return <DashboardOverview />;
    }
  };

  if (!isMounted) return null;

  return (
      <NeuralNetworkContainer className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
        <DoctorNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="pt-16 relative w-full h-full min-h-screen pb-20">

          {/* Render the Landing Page sections when activeTab is dashboard */}
          {activeTab === 'dashboard' && (
            <>
              <DoctorHero setActiveTab={setActiveTab} />
              <div className="relative -mt-16 mx-4 md:mx-auto">
                <DoctorFeatureCards setActiveTab={setActiveTab} />
              </div>
            </>
          )}

          {/* Render specific management tools when activeTab is not dashboard */}
          {activeTab !== 'dashboard' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="mb-6 flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200/50 shadow-sm w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-semibold text-sm">Back to Dashboard Home</span>
              </button>
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/60 overflow-hidden min-h-[70vh]">
                {renderContent()}
              </div>
            </div>
          )}
        </main>
      </NeuralNetworkContainer>
  );
}
