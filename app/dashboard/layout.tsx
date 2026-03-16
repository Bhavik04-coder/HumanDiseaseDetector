'use client';

import { DoctorStateProvider } from '@/components/doctor/DoctorStateContext';
import Footer from '@/components/landing/Footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DoctorStateProvider>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </DoctorStateProvider>
  );
}
