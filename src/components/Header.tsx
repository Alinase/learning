import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, User as UserIcon } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentView, setCurrentView, activeRole, currentUser } = useApp();

  const handleDashboardClick = () => {
    if (activeRole === 'student') setCurrentView('student-dashboard');
    else if (activeRole === 'instructor') setCurrentView('instructor-dashboard');
    else if (activeRole === 'admin') setCurrentView('admin-dashboard');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <button
          onClick={() => setCurrentView('home')}
          className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-teal-700 transition-colors text-left flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
            AL
          </span>
          <span>AliTech eLearning</span>
        </button>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setCurrentView('courses')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 ${
              currentView === 'courses' ? 'text-teal-700 font-semibold' : ''
            }`}
          >
            Explore Courses
          </button>
          <button
            onClick={() => setCurrentView('corporate')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 ${
              currentView === 'corporate' ? 'text-teal-700 font-semibold' : ''
            }`}
          >
            Corporate Training
          </button>
          <button
            onClick={() => setCurrentView('community')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 ${
              currentView === 'community' ? 'text-teal-700 font-semibold' : ''
            }`}
          >
            Community
          </button>
          <button
            onClick={() => setCurrentView('verify')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 ${
              currentView === 'verify' ? 'text-teal-700 font-semibold' : ''
            }`}
          >
            Verify Certificate
          </button>
          <button
            onClick={() => setCurrentView('about')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 ${
              currentView === 'about' ? 'text-teal-700 font-semibold' : ''
            }`}
          >
            About
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDashboardClick}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs"
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>
              {activeRole === 'student' ? 'Student Portal' : activeRole === 'instructor' ? 'Instructor Portal' : 'Admin Console'}
            </span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export const PlatformUtilityStrip: React.FC = () => {
  const { activeRole, setActiveRole, currency, setCurrency, setCurrentView, currentUser } = useApp();

  return (
    <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800 py-1.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="font-medium text-slate-200">AliTech Investments Ltd</span>
          <span aria-hidden="true">·</span>
          <span>Lusaka, Zambia</span>
          <span aria-hidden="true">·</span>
          <span className="text-teal-400">elearning.alitech.co.zm</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Currency Toggle */}
          <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-md border border-slate-700">
            <button
              onClick={() => setCurrency('ZMW')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                currency === 'ZMW' ? 'bg-teal-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              ZMW (K)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                currency === 'USD' ? 'bg-teal-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 hidden sm:inline">Active View:</span>
            <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-md border border-slate-700">
              <button
                onClick={() => {
                  setActiveRole('student');
                  setCurrentView('student-dashboard');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  activeRole === 'student' ? 'bg-white text-slate-900 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => {
                  setActiveRole('instructor');
                  setCurrentView('instructor-dashboard');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  activeRole === 'instructor' ? 'bg-white text-slate-900 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Instructor
              </button>
              <button
                onClick={() => {
                  setActiveRole('admin');
                  setCurrentView('admin-dashboard');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  activeRole === 'admin' ? 'bg-white text-slate-900 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
