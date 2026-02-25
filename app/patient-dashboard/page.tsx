'use client';

import PatientNavbar from '@/components/patient/PatientNavbar';
import HeroSection from '@/components/patient/HeroSection';
import FeatureCards from '@/components/patient/FeatureCards';
import ServicesSection from '@/components/patient/ServicesSection';
import Footer from '@/components/patient/Footer';

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <PatientNavbar />
      
      <HeroSection />

      <FeatureCards />

      <ServicesSection />

      <Footer />
    </div>
  );
}

