import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_LIVE_CLASSES } from '../data/mockData';
import {
  BookOpen,
  Award,
  Calendar,
  CreditCard,
  FileText,
  User,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Download,
  Video,
  Play,
  RotateCcw
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    courses,
    currentUser,
    setCurrentUser,
    progress,
    getCourseProgressPercentage,
    startCoursePlayer,
    setActiveCertificate,
    transactions,
    formatPrice,
    showNotification
  } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'live' | 'certificates' | 'assessments' | 'resources' | 'payments' | 'profile'>('courses');

  // Filter enrolled courses
  const enrolledCourses = courses.filter((c) => currentUser.enrolledCourseIds.includes(c.id));

  // Profile edit states
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [title, setTitle] = useState(currentUser.title || 'Junior Cloud Systems Administrator');
  const [location, setLocation] = useState(currentUser.location || 'Lusaka, Zambia');
  const [bio, setBio] = useState(currentUser.bio || '');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser((prev) => ({
      ...prev,
      name,
      email,
      title,
      location,
      bio
    }));
    showNotification('Personal profile updated successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Student Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500 shadow-sm"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
              <span>Student Account</span>
              <span aria-hidden="true">·</span>
              <span>{currentUser.location}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">{currentUser.name}</h1>
            <p className="text-xs text-slate-400 mt-0.5">{currentUser.title}</p>
          </div>
        </div>

        {/* Quick learning streak & completion stats */}
        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 text-xs">
          <div>
            <span className="text-slate-400 block">Enrolled Courses</span>
            <span className="text-xl font-extrabold text-white font-mono">{enrolledCourses.length}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Certificates Earned</span>
            <span className="text-xl font-extrabold text-teal-400 font-mono">
              {currentUser.certificates?.length || 0}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">Learning Streak</span>
            <span className="text-xl font-extrabold text-amber-400 font-mono">14 Days 🔥</span>
          </div>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 text-xs">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'courses' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>My Enrolled Courses ({enrolledCourses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('live')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'live' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Upcoming Classes ({INITIAL_LIVE_CLASSES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('certificates')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'certificates' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Certificates ({currentUser.certificates?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('assessments')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'assessments' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Assessments & Quizzes</span>
        </button>

        <button
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'resources' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Resources & Lab Guides</span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'payments' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Payment History</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'profile' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Profile & Settings</span>
        </button>
      </div>

      {/* Tab: Enrolled Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Active Learning Programs</h2>
            <span className="text-xs text-slate-500 font-mono">{enrolledCourses.length} Registered</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => {
              const pct = getCourseProgressPercentage(course.id);
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
                        {course.level}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <span className="text-xs font-semibold text-teal-700 truncate block">{course.category}</span>
                      <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">{course.title}</h3>

                      {/* Progress bar */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex items-center justify-between text-xs text-slate-600 font-mono">
                          <span>Progress</span>
                          <span className="font-bold text-teal-700">{pct}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-teal-600 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{course.durationHours} hrs total</span>
                    <button
                      onClick={() => startCoursePlayer(course.id)}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>{pct > 0 ? 'Resume' : 'Start'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Upcoming Live Classes */}
      {activeTab === 'live' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Upcoming Live Virtual Masterclasses</h2>
              <p className="text-xs text-slate-500">Live review sessions with instructors in Central Africa Time (CAT)</p>
            </div>
          </div>

          <div className="space-y-4">
            {INITIAL_LIVE_CLASSES.map((cls) => (
              <div
                key={cls.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-teal-700 font-semibold">
                    <Video className="w-4 h-4 text-teal-600" />
                    <span>{cls.courseTitle}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{cls.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Saturday, 14:00 CAT (Lusaka Time)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{cls.durationMinutes} Minutes</span>
                    </div>
                    <div>
                      <span>Instructor: {cls.instructorName}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-slate-700 block mb-1">Session Agenda:</span>
                    <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                      {cls.agenda.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                  <a
                    href={cls.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Class Room</span>
                  </a>
                  <button
                    onClick={() => showNotification('Added session to calendar (CAT Lusaka Time)!')}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition-colors"
                  >
                    Add to Calendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Certificates */}
      {activeTab === 'certificates' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">My Earned AliTech Certificates</h2>
              <p className="text-xs text-slate-500">
                Official verified credentials accredited by AliTech Investments Ltd, Lusaka, Zambia
              </p>
            </div>
          </div>

          {currentUser.certificates.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 text-xs text-slate-500">
              You haven't completed any course yet. Reach 100% or pass the final exam in an enrolled course to claim your
              certificate!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentUser.certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                        Verified Credential
                      </span>
                      <span className="text-xs font-mono text-slate-400">{cert.id}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{cert.courseTitle}</h3>
                    <div className="text-xs text-slate-500 space-y-1">
                      <p>Recipient: <strong className="text-slate-800">{cert.studentName}</strong></p>
                      <p>Issue Date: {cert.issueDate} · Duration: {cert.totalHours} hrs</p>
                      <p>Grade Achieved: <span className="font-bold text-emerald-700">{cert.gradePercentage}%</span></p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">{cert.verificationCode}</span>
                    <button
                      onClick={() => setActiveCertificate(cert)}
                      className="px-4 py-2 bg-slate-900 hover:bg-teal-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>View & Print</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Assessments and Quiz Results */}
      {activeTab === 'assessments' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Quiz & Lab Evaluations</h2>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">Essential Digital Skills Knowledge Exam</span>
                  <span className="text-slate-500">Course: Essential Digital Skills & Cloud Workplace</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-emerald-600 block">96% Passed</span>
                  <span className="text-[11px] text-slate-400">Status: Verified</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">Google Cloud VPC & IAM Shell Lab</span>
                  <span className="text-slate-500">Course: Google Cloud Platform (GCP) & Enterprise Architecture</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-teal-600 block">Verified Completed</span>
                  <span className="text-[11px] text-slate-400">Cloud Shell Sandbox</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Resources */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Downloadable Technical Handbooks & Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">GCP_Architecture_Blueprint_Lusaka.pdf</span>
                <span className="text-slate-500">Enterprise reference architecture for Southern Africa · 3.4 MB</span>
              </div>
              <button
                onClick={() => showNotification('Downloaded GCP_Architecture_Blueprint_Lusaka.pdf')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-medium flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">Cybersecurity_SOC_Playbook_Zambia.pdf</span>
                <span className="text-slate-500">Incident response triage checklist for financial systems · 2.8 MB</span>
              </div>
              <button
                onClick={() => showNotification('Downloaded Cybersecurity_SOC_Playbook_Zambia.pdf')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-medium flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Payments History */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Enrolment Invoices & Mobile Money Receipts</h2>
            <span className="text-xs text-slate-500">Instant Zambian tax invoice receipts</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Receipt / Ref</th>
                    <th className="py-3 px-4">Course</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {transactions.slice(0, 5).map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-medium text-slate-900">{tx.referenceNumber}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{tx.courseTitle}</td>
                      <td className="py-3 px-4">{tx.paymentMethod}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {tx.currency === 'ZMW' ? `ZMW ${tx.amountZMW.toLocaleString()}` : `$${tx.amountUSD}`}
                      </td>
                      <td className="py-3 px-4">{tx.date}</td>
                      <td className="py-3 px-4">
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Profile & Settings */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Personal Profile & Learning Preferences</h2>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Full Legal Name (for Certificates)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Professional Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Location / Timezone</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Biography & Career Aspirations</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold transition-colors shadow-xs"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
