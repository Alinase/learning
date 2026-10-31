/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header, PlatformUtilityStrip } from './components/Header';
import { Footer } from './components/Footer';
import { PaymentModal } from './components/PaymentModal';
import { CertificateModal } from './components/CertificateModal';

// Pages
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { CoursePlayer } from './components/CoursePlayer';
import { StudentDashboard } from './pages/StudentDashboard';
import { InstructorDashboard } from './pages/InstructorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AboutPage } from './pages/AboutPage';
import { CorporatePage } from './pages/CorporatePage';
import { BecomeInstructorPage } from './pages/BecomeInstructorPage';
import { CommunityPage } from './pages/CommunityPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { ContactPage } from './pages/ContactPage';
import { VerifyCertificatePage } from './pages/VerifyCertificatePage';

import { CheckCircle2, AlertCircle } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, notificationMessage } = useApp();

  const isPlayerView = currentView === 'course-player';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Toast Notification */}
      {notificationMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-slate-900 text-white text-xs font-medium px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{notificationMessage}</span>
          </div>
        </div>
      )}

      {/* Top Utility and Navigation */}
      {!isPlayerView && (
        <>
          <PlatformUtilityStrip />
          <Header />
        </>
      )}

      {/* Primary Page Router */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage />}
        {currentView === 'courses' && <CoursesPage />}
        {currentView === 'course-detail' && <CourseDetailPage />}
        {currentView === 'course-player' && <CoursePlayer />}
        {currentView === 'student-dashboard' && <StudentDashboard />}
        {currentView === 'instructor-dashboard' && <InstructorDashboard />}
        {currentView === 'admin-dashboard' && <AdminDashboard />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'corporate' && <CorporatePage />}
        {currentView === 'become-instructor' && <BecomeInstructorPage />}
        {currentView === 'community' && <CommunityPage />}
        {currentView === 'help' && <HelpCenterPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'verify' && <VerifyCertificatePage />}
      </main>

      {/* Global Modals */}
      <PaymentModal />
      <CertificateModal />

      {/* Global Footer */}
      {!isPlayerView && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
