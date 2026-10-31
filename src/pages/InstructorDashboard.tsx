import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course, CourseCategory, Module, Lesson } from '../types';
import { CATEGORIES } from '../data/mockData';
import {
  PlusCircle,
  BookOpen,
  Users,
  BarChart,
  MessageSquare,
  FileText,
  CheckCircle2,
  DollarSign,
  Upload,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const InstructorDashboard: React.FC = () => {
  const { courses, setCourses, formatPrice, showNotification } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'create-course' | 'grading' | 'communication' | 'analytics'>('courses');

  // New Course creation form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CourseCategory>('Cloud Computing (Google Cloud, Azure, AWS)');
  const [newTagline, setNewTagline] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriceZMW, setNewPriceZMW] = useState(1200);
  const [newPriceUSD, setNewPriceUSD] = useState(45);
  const [newDuration, setNewDuration] = useState(30);
  const [newLevel, setNewLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [newCertPrep, setNewCertPrep] = useState('AWS Solutions Architect / GCP');

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const courseId = `course-custom-${Date.now()}`;
    const newCourse: Course = {
      id: courseId,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newTitle,
      tagline: newTagline || 'Enterprise technology training course by AliTech.',
      description: newDescription || 'Master hands-on skills with practical industry-oriented curriculum.',
      category: newCategory,
      level: newLevel,
      format: 'self-paced',
      durationHours: Number(newDuration),
      rating: 5.0,
      reviewCount: 1,
      enrolledCount: 1,
      priceZMW: Number(newPriceZMW),
      priceUSD: Number(newPriceUSD),
      thumbnail: '/src/assets/images/cloud_cybersecurity_lab_1793474031756.jpg',
      instructorId: 'inst-1',
      instructorName: 'Alinafe Nyirenda',
      instructorTitle: 'Principal Cloud Architect & Founder, AliTech',
      instructorAvatar: '/src/assets/images/african_tech_instructor_1793474033391.jpg',
      instructorBio: 'Lead technology mentor and architect at AliTech Investments Ltd Lusaka.',
      learningObjectives: [
        'Understand enterprise cloud infrastructure blueprints',
        'Configure secure network topologies and policies',
        'Complete hands-on terminal sandbox verification'
      ],
      prerequisites: ['Basic computer networking knowledge'],
      certificationPrep: newCertPrep,
      published: true,
      featured: false,
      updatedAt: 'October 2026',
      modules: [
        {
          id: 'mod-1',
          title: 'Module 1: Architecture Fundamentals',
          description: 'Core concepts and environment configuration.',
          lessons: [
            {
              id: `les-1`,
              title: '1.1 System Architecture Deep Dive',
              duration: '15 mins',
              type: 'video',
              contentMarkdown: 'Detailed walkthrough of high availability patterns.'
            }
          ]
        }
      ]
    };

    setCourses((prev) => [newCourse, ...prev]);
    showNotification(`Course "${newTitle}" created and published!`);
    setActiveTab('courses');
    setNewTitle('');
    setNewTagline('');
  };

  // Mock student submissions for grading
  const [submissions, setSubmissions] = useState([
    {
      id: 'sub-1',
      studentName: 'Chileshe Mwape',
      courseTitle: 'Google Cloud Platform (GCP) & Enterprise Architecture',
      task: 'Module 1: VPC Multi-Tier Subnet Topology Configuration',
      submittedAt: 'Yesterday 16:30 CAT',
      status: 'pending',
      grade: null as number | null
    },
    {
      id: 'sub-2',
      studentName: 'Tendai Mutale',
      courseTitle: 'Practical Cybersecurity & SOC Analyst Operations',
      task: 'Lab 2: Wireshark Packet Dissection & Beacon Analysis',
      submittedAt: 'Today 09:15 CAT',
      status: 'graded',
      grade: 95
    }
  ]);

  const handleGrade = (id: string, score: number) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'graded', grade: score } : s))
    );
    showNotification(`Assessment graded with ${score}%! Student notified.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Instructor Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src="/src/assets/images/african_tech_instructor_1793474033391.jpg"
            alt="Alinafe Nyirenda"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500 shadow-sm"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
              <span>Instructor Portal</span>
              <span aria-hidden="true">·</span>
              <span>AliTech Faculty</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Alinafe Nyirenda</h1>
            <p className="text-xs text-slate-400 mt-0.5">Principal Cloud Architect & Lead Instructor</p>
          </div>
        </div>

        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 text-xs">
          <div>
            <span className="text-slate-400 block">Total Active Learners</span>
            <span className="text-xl font-extrabold text-white font-mono">3,890</span>
          </div>
          <div>
            <span className="text-slate-400 block">Course Rating</span>
            <span className="text-xl font-extrabold text-teal-400 font-mono">4.92 ★</span>
          </div>
          <div>
            <span className="text-slate-400 block">Total Royalty</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono">ZMW 94,500</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 text-xs">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'courses' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>My Courses ({courses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('create-course')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'create-course' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Create New Course</span>
        </button>

        <button
          onClick={() => setActiveTab('grading')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'grading' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Grading Center ({submissions.filter((s) => s.status === 'pending').length} Pending)</span>
        </button>

        <button
          onClick={() => setActiveTab('communication')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'communication' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Student Messages</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'analytics' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Performance & Analytics</span>
        </button>
      </div>

      {/* Tab: Courses List */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Authored Courses & Materials</h2>
            <button
              onClick={() => setActiveTab('create-course')}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create New Course</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Course Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price (ZMW / USD)</th>
                  <th className="py-3.5 px-4">Enrolled</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs truncate">
                      {c.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-[200px] truncate">{c.category}</td>
                    <td className="py-3.5 px-4 font-mono font-medium">
                      {formatPrice(c.priceZMW, c.priceUSD)}
                    </td>
                    <td className="py-3.5 px-4 font-mono">{c.enrolledCount.toLocaleString()}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold">
                        Published
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => showNotification(`Opened curriculum editor for ${c.title}`)}
                        className="px-2.5 py-1 text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 rounded font-semibold text-[11px] transition-colors"
                      >
                        Edit Modules
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Create New Course */}
      {activeTab === 'create-course' && (
        <div className="max-w-3xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Create & Publish a Technology Course</h2>
            <p className="text-xs text-slate-500 mt-1">
              Add course curriculum, pricing in Zambian Kwacha (ZMW), learning outcomes, and practical lab environments.
            </p>
          </div>

          <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Course Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Advanced Kubernetes Security & Cloud Native Defense"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-hidden"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Difficulty Level</label>
                <select
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-hidden"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Short Tagline</label>
              <input
                type="text"
                value={newTagline}
                onChange={(e) => setNewTagline(e.target.value)}
                placeholder="Brief 1-line executive summary of skills gained"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Full Course Description</label>
              <textarea
                rows={4}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Detailed curriculum description, hands-on lab scope, and enterprise application..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Price in ZMW (K)</label>
                <input
                  type="number"
                  value={newPriceZMW}
                  onChange={(e) => setNewPriceZMW(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Price in USD ($)</label>
                <input
                  type="number"
                  value={newPriceUSD}
                  onChange={(e) => setNewPriceUSD(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Duration (Hours)</label>
                <input
                  type="number"
                  value={newDuration}
                  onChange={(e) => setNewDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Certification Prep Alignment</label>
              <input
                type="text"
                value={newCertPrep}
                onChange={(e) => setNewCertPrep(e.target.value)}
                placeholder="e.g. Google Cloud Associate Cloud Engineer or CompTIA Security+"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold transition-colors shadow-xs"
              >
                Publish Course Instantly
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('courses')}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab: Grading Center */}
      {activeTab === 'grading' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Student Assignment & Lab Submissions</h2>
            <span className="text-xs text-slate-500">Review practical lab logs and issue final grades</span>
          </div>

          <div className="space-y-4">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{sub.studentName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500">{sub.submittedAt}</span>
                  </div>
                  <p className="text-teal-700 font-semibold">{sub.courseTitle}</p>
                  <p className="text-slate-600">{sub.task}</p>
                </div>

                <div className="flex items-center gap-3">
                  {sub.status === 'pending' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleGrade(sub.id, 92)}
                        className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Grade 92% (Pass)
                      </button>
                      <button
                        onClick={() => handleGrade(sub.id, 85)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                      >
                        Grade 85%
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                      Graded: {sub.grade}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Communication */}
      {activeTab === 'communication' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Course Broadcasts & Student Questions</h2>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-sm font-semibold text-slate-800">Post Announcement to All Enrolled Learners</h3>
            <textarea
              rows={3}
              placeholder="Post an announcement or schedule notice to your students..."
              className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            />
            <div className="flex justify-end">
              <button
                onClick={() => showNotification('Announcement broadcast to all course learners!')}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold"
              >
                Send Broadcast
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Course Engagement & Completion Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500">Average Course Completion</span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono">78.4%</span>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500">Quiz Passing Rate</span>
              <span className="text-2xl font-extrabold text-emerald-600 font-mono">92.1%</span>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500">Learners Seeking Certification</span>
              <span className="text-2xl font-extrabold text-teal-600 font-mono">86%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
