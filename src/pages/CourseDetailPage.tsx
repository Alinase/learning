import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  Award,
  Users,
  CheckCircle2,
  FileText,
  Terminal,
  PlayCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  ChevronDown,
  Building2
} from 'lucide-react';

export const CourseDetailPage: React.FC = () => {
  const {
    courses,
    selectedCourseId,
    currentUser,
    startCoursePlayer,
    setActivePaymentCourse,
    formatPrice,
    getCourseProgressPercentage
  } = useApp();

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const isEnrolled = currentUser.enrolledCourseIds.includes(course.id);
  const progressPercent = getCourseProgressPercentage(course.id);

  return (
    <div className="pb-20 space-y-12">
      {/* Course Hero Banner */}
      <div className="bg-slate-900 text-white pt-12 pb-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-teal-400 font-semibold tracking-wider uppercase">
                <span>{course.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300">{course.level}</span>
                <span aria-hidden="true">·</span>
                <span className="capitalize text-slate-300">{course.format.replace('-', ' ')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {course.tagline}
              </p>

              {/* Certification alignment pill-free note */}
              {course.certificationPrep && (
                <div className="p-3.5 rounded-xl bg-teal-950/80 border border-teal-800 text-xs text-teal-200 flex items-center gap-2.5 max-w-xl">
                  <Award className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Aligned with: <strong className="text-white">{course.certificationPrep}</strong></span>
                </div>
              )}

              {/* Course Meta Specs */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 pt-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{course.durationHours} Hours total duration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{course.enrolledCount.toLocaleString()} enrolled learners</span>
                </div>
                <div>
                  <span>Updated: {course.updatedAt}</span>
                </div>
              </div>

              {/* Instructor snippet */}
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructorName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-xs text-slate-400 block">Course Lead</span>
                  <span className="text-sm font-semibold text-white">{course.instructorName}</span>
                </div>
              </div>
            </div>

            {/* Right Card: Sticky Enrollment Card (4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl p-6 text-slate-900 border border-slate-200 shadow-2xl space-y-6">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                    <button
                      onClick={() => startCoursePlayer(course.id)}
                      className="w-12 h-12 rounded-full bg-white/90 text-teal-700 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                    >
                      <PlayCircle className="w-7 h-7" />
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-400 block">Enrolment Fee</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900">
                      {formatPrice(course.priceZMW, course.priceUSD)}
                    </span>
                    {course.priceZMW > 0 && (
                      <span className="text-xs text-slate-500">one-time full lifetime access</span>
                    )}
                  </div>
                </div>

                {isEnrolled ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 space-y-1">
                      <div className="flex items-center justify-between font-semibold">
                        <span>You are enrolled!</span>
                        <span>{progressPercent}% Complete</span>
                      </div>
                      <div className="w-full h-1.5 bg-emerald-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                      </div>
                    </div>
                    <button
                      onClick={() => startCoursePlayer(course.id)}
                      className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <span>Resume Course Player</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setActivePaymentCourse(course)}
                    className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>{course.priceZMW === 0 ? 'Enrol Free Now' : 'Enrol in Course'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {/* Instant Zambian Payment Badges */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block">
                    Instant Zambian & International Checkout:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">Airtel Money</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">MTN MoMo</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">Zanaco / Stanbic</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">Visa / Mastercard</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Includes Interactive Cloud Shell Labs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Official AliTech Verified Digital Certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Direct Instructor Q&A Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Course Body: Syllabus & Objectives */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Learning Objectives */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">What You Will Learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.learningObjectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Course Curriculum</h2>
              <span className="text-xs text-slate-500 font-mono">
                {course.modules.length} Modules · {course.modules.flatMap((m) => m.lessons).length} Lessons
              </span>
            </div>

            <div className="space-y-3">
              {course.modules.length === 0 ? (
                <div className="p-6 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500">
                  Curriculum modules are being finalized for this upcoming session.
                </div>
              ) : (
                course.modules.map((module, mIndex) => (
                  <div key={module.id} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">{module.title}</h3>
                      <span className="text-xs text-slate-400 font-mono">{module.lessons.length} lessons</span>
                    </div>
                    <p className="text-xs text-slate-500">{module.description}</p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-xs text-slate-700 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            {lesson.type === 'video' && <PlayCircle className="w-4 h-4 text-teal-600 shrink-0" />}
                            {lesson.type === 'lab' && <Terminal className="w-4 h-4 text-amber-600 shrink-0" />}
                            {lesson.type === 'quiz' && <HelpCircle className="w-4 h-4 text-purple-600 shrink-0" />}
                            {lesson.type === 'reading' && <FileText className="w-4 h-4 text-slate-500 shrink-0" />}
                            <span className="font-medium">{lesson.title}</span>
                          </div>
                          <span className="font-mono text-[11px] text-slate-400">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Prerequisites */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <h3 className="text-base font-bold text-slate-900">Requirements & Prerequisites</h3>
            <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
              {course.prerequisites.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          {/* Instructor Bio */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">About the Instructor</h3>
            <div className="flex items-start gap-4">
              <img
                src={course.instructorAvatar}
                alt={course.instructorName}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1 text-xs">
                <h4 className="text-sm font-bold text-slate-900">{course.instructorName}</h4>
                <p className="text-teal-700 font-medium">{course.instructorTitle}</p>
                <p className="text-slate-600 leading-relaxed pt-1">{course.instructorBio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Help / FAQ */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900">Corporate or Team Enrolment?</h3>
            <p className="text-slate-600 leading-relaxed">
              Enrolling 5 or more engineers or staff members? We provide volume discounts, dedicated corporate
              dashboards, and consolidated invoicing.
            </p>
            <button
              onClick={() => setActivePaymentCourse(course)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold transition-colors"
            >
              Request Corporate Quote
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-slate-900">Need Help with Mobile Money?</h3>
            <p className="text-slate-600 leading-relaxed">
              If your Airtel Money or MTN MoMo push prompt does not appear, contact our Lusaka technical operations desk
              immediately via WhatsApp or call.
            </p>
            <div className="font-mono text-slate-700 pt-1">
              Tel: +260 97 700 0000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
