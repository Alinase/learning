import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TerminalLab } from './TerminalLab';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Maximize2,
  FileText,
  Terminal,
  CheckCircle2,
  Circle,
  HelpCircle,
  Download,
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CoursePlayer: React.FC = () => {
  const {
    courses,
    selectedCourseId,
    selectedLessonId,
    setSelectedLessonId,
    setCurrentView,
    progress,
    markLessonComplete,
    recordQuizScore,
    recordLabComplete,
    getCourseProgressPercentage,
    issueCertificate,
    setActiveCertificate,
    showNotification
  } = useApp();

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];

  // Flatten lessons
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const activeLesson = allLessons.find((l) => l.id === selectedLessonId) || allLessons[0] || {
    id: 'intro',
    title: 'Course Introduction',
    duration: '10 mins',
    type: 'reading' as const,
    contentMarkdown: 'Welcome to this AliTech course. Select a module to begin.'
  };

  const courseProgress = progress[course.id] || {
    completedLessonIds: [],
    quizScores: {},
    labCompleted: {}
  };

  // Video state simulation
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(140);
  const [totalDuration] = useState(720);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'notes' | 'discussion'>('overview');
  const [userNotes, setUserNotes] = useState(
    'Key take-away: Google Cloud africa-south1 in Johannesburg gives <30ms latency to Lusaka over direct Teraco fiber.'
  );

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Track video progress simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            markLessonComplete(course.id, activeLesson.id);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackRate, totalDuration, course.id, activeLesson.id]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleNextLesson = () => {
    markLessonComplete(course.id, activeLesson.id);
    const currentIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
    if (currentIndex < allLessons.length - 1) {
      setSelectedLessonId(allLessons[currentIndex + 1].id);
      setIsPlaying(false);
      setQuizSubmitted(false);
      setQuizAnswers({});
    } else {
      showNotification('Congratulations! You completed the final lesson in this course.');
    }
  };

  const handlePreviousLesson = () => {
    const currentIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
    if (currentIndex > 0) {
      setSelectedLessonId(allLessons[currentIndex - 1].id);
      setIsPlaying(false);
      setQuizSubmitted(false);
      setQuizAnswers({});
    }
  };

  const handleQuizSubmit = () => {
    if (!activeLesson.quiz) return;
    let correct = 0;
    activeLesson.quiz.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctOptionIndex) {
        correct++;
      }
    });
    const percentage = Math.round((correct / activeLesson.quiz.questions.length) * 100);
    setQuizScore(percentage);
    setQuizSubmitted(true);
    recordQuizScore(course.id, activeLesson.quiz.id, percentage);

    if (percentage >= activeLesson.quiz.passingScore) {
      markLessonComplete(course.id, activeLesson.id);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
      showNotification(`Assessment Passed with ${percentage}%!`);
    } else {
      showNotification(`Score: ${percentage}%. You need ${activeLesson.quiz.passingScore}% to pass.`);
    }
  };

  const handleClaimCertificate = () => {
    const cert = issueCertificate(course.id);
    setActiveCertificate(cert);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }
  };

  const progressPercent = getCourseProgressPercentage(course.id);
  const isLessonDone = courseProgress.completedLessonIds.includes(activeLesson.id);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Player Navigation Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('course-detail')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Syllabus</span>
          </button>
          <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>
          <div>
            <span className="text-[11px] text-teal-400 font-semibold uppercase tracking-wider block">
              {course.category}
            </span>
            <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Progress & Certificate trigger */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">{progressPercent}% Completed</span>
            <div className="w-28 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {progressPercent >= 50 && (
            <button
              onClick={handleClaimCertificate}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Award className="w-4 h-4 text-slate-950" />
              <span>Claim Certificate</span>
            </button>
          )}

          <button
            onClick={() => setCurrentView('student-dashboard')}
            className="text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Main Learning Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Left/Center: Content Stage (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-slate-950 overflow-y-auto">
          {/* Active Lesson Viewport */}
          <div className="p-4 sm:p-6 flex-1 space-y-6">
            {activeLesson.type === 'video' && (
              <div className="space-y-4">
                {/* Simulated Video Player */}
                <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between group">
                  {/* Poster/Backdrop */}
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-35"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 rounded-full bg-teal-600/90 text-white flex items-center justify-center shadow-lg hover:scale-105 hover:bg-teal-500 transition-all z-10"
                    >
                      {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                    </button>
                  </div>

                  {/* Top info overlay */}
                  <div className="relative z-10 p-4 flex items-center justify-between text-xs text-slate-300">
                    <span className="bg-slate-900/80 px-2.5 py-1 rounded-md backdrop-blur-xs font-medium">
                      AliTech HD Stream · Lusaka Server Edge
                    </span>
                    <span className="font-mono text-slate-400">{course.instructorName}</span>
                  </div>

                  {/* Bottom Video Controls Bar */}
                  <div className="relative z-10 p-4 bg-gradient-to-t from-black/95 to-transparent space-y-2">
                    {/* Timeline Scrubber */}
                    <div
                      className="w-full h-1.5 bg-slate-700/80 rounded-full overflow-hidden cursor-pointer relative"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const pct = clickX / rect.width;
                        setPlaybackTime(Math.round(pct * totalDuration));
                      }}
                    >
                      <div
                        className="h-full bg-teal-500 relative"
                        style={{ width: `${(playbackTime / totalDuration) * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="hover:text-white transition-colors"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <span className="font-mono text-[11px] text-slate-400">
                          {formatTime(playbackTime)} / {formatTime(totalDuration)}
                        </span>
                        <div className="flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer">
                          <Volume2 className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Speed selector */}
                        <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded text-[11px] border border-slate-700">
                          {[1, 1.25, 1.5, 2].map((rate) => (
                            <button
                              key={rate}
                              onClick={() => setPlaybackRate(rate)}
                              className={`px-1 rounded ${playbackRate === rate ? 'text-teal-400 font-bold' : 'text-slate-400'}`}
                            >
                              {rate}x
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            if (document.fullscreenElement) {
                              document.exitFullscreen?.();
                            } else {
                              document.documentElement.requestFullscreen?.();
                            }
                          }}
                          className="hover:text-white"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lesson Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{activeLesson.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Duration: {activeLesson.duration} · Instructor: {course.instructorName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => markLessonComplete(course.id, activeLesson.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        isLessonDone
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-teal-600 hover:bg-teal-500 text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isLessonDone ? 'Completed' : 'Mark as Complete'}</span>
                    </button>
                    <button
                      onClick={handleNextLesson}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Lab View */}
            {activeLesson.type === 'lab' && activeLesson.lab && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-teal-400">
                      Practical Hands-on Lab
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{activeLesson.lab.title}</h3>
                  </div>
                  <button
                    onClick={() => markLessonComplete(course.id, activeLesson.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isLessonDone
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-teal-600 hover:bg-teal-500 text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isLessonDone ? 'Completed' : 'Mark as Complete'}</span>
                  </button>
                </div>

                <TerminalLab
                  lab={activeLesson.lab}
                  courseId={course.id}
                  isPassed={isLessonDone}
                  onComplete={() => {
                    recordLabComplete(course.id, activeLesson.lab!.id);
                    markLessonComplete(course.id, activeLesson.id);
                  }}
                />
              </div>
            )}

            {/* Quiz View */}
            {activeLesson.type === 'quiz' && activeLesson.quiz && (
              <div className="space-y-6 max-w-3xl">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-wider text-teal-400">
                      Knowledge Assessment
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Passing Criteria: {activeLesson.quiz.passingScore}%
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{activeLesson.quiz.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Test your understanding before advancing to the next module. Answer all questions below.
                  </p>
                </div>

                {/* Questions */}
                <div className="space-y-6">
                  {activeLesson.quiz.questions.map((q, qIndex) => {
                    const selected = quizAnswers[q.id];
                    const isCorrect = selected === q.correctOptionIndex;

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-2xl border transition-colors ${
                          quizSubmitted
                            ? isCorrect
                              ? 'bg-emerald-950/20 border-emerald-800'
                              : 'bg-rose-950/20 border-rose-800'
                            : 'bg-slate-900 border-slate-800'
                        }`}
                      >
                        <h4 className="text-sm font-semibold text-white mb-3 leading-snug">
                          {qIndex + 1}. {q.question}
                        </h4>

                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isOptionSelected = selected === optIdx;
                            return (
                              <button
                                key={optIdx}
                                type="button"
                                disabled={quizSubmitted}
                                onClick={() =>
                                  setQuizAnswers((prev) => ({
                                    ...prev,
                                    [q.id]: optIdx
                                  }))
                                }
                                className={`w-full p-3 rounded-xl border text-left text-xs transition-colors flex items-center gap-3 ${
                                  isOptionSelected
                                    ? 'bg-teal-950/50 border-teal-500 text-white font-medium'
                                    : 'border-slate-800 bg-slate-950/50 hover:bg-slate-800/50 text-slate-300'
                                }`}
                              >
                                <span
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center font-mono text-[11px] ${
                                    isOptionSelected
                                      ? 'border-teal-400 bg-teal-600 text-white'
                                      : 'border-slate-700 text-slate-500'
                                  }`}
                                >
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div className="mt-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                            <span className="font-semibold block text-teal-400 mb-0.5">Explanation:</span>
                            <p className="text-slate-300">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Submit button */}
                <div className="flex items-center justify-between pt-4">
                  {!quizSubmitted ? (
                    <button
                      type="button"
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(quizAnswers).length < activeLesson.quiz.questions.length}
                      className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                    >
                      Submit Exam for Evaluation
                    </button>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-bold">
                        Your Score:{' '}
                        <span className={quizScore! >= activeLesson.quiz.passingScore ? 'text-emerald-400' : 'text-rose-400'}>
                          {quizScore}%
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setQuizSubmitted(false);
                          setQuizAnswers({});
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium"
                      >
                        Retake Assessment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reading View */}
            {activeLesson.type === 'reading' && (
              <div className="space-y-4 max-w-3xl">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-teal-400">
                    Comprehensive Reading Module
                  </span>
                  <h3 className="text-xl font-bold text-white">{activeLesson.title}</h3>
                  <p className="text-xs text-slate-400">Estimated Reading Time: {activeLesson.duration}</p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 prose prose-invert text-xs leading-relaxed text-slate-300 space-y-4">
                  <p>{activeLesson.contentMarkdown}</p>
                  <p>
                    In modern African enterprise environments, achieving high availability requires designing for
                    intermittent upstream connectivity and leveraging regional Points of Presence (PoPs). Organizations
                    migrating core workloads benefit from containerized microservices managed through Kubernetes.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-teal-300">
                    // Best Practice Architecture Rule: Always deploy across minimum 2 availability zones in the
                    Johannesburg (africa-south1) region.
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => markLessonComplete(course.id, activeLesson.id)}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Mark Reading Complete
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Tabs: Overview, Resources, Notes, Discussion */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <div className="flex items-center gap-1 border-b border-slate-800 pb-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'overview' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Lesson Overview
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeTab === 'resources' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Downloads ({activeLesson.downloadResources?.length || 2})</span>
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeTab === 'notes' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>My Notes</span>
                </button>
                <button
                  onClick={() => setActiveTab('discussion')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeTab === 'discussion' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Q&A</span>
                </button>
              </div>

              {activeTab === 'overview' && (
                <div className="text-xs text-slate-400 space-y-2">
                  <p>{course.description}</p>
                  <div className="flex flex-wrap gap-4 pt-2 text-[11px] text-slate-500">
                    <span>Accreditation: AliTech Investments Ltd (Lusaka)</span>
                    <span>·</span>
                    <span>Format: {course.format}</span>
                    <span>·</span>
                    <span>Level: {course.level}</span>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-teal-400" />
                      <div>
                        <span className="font-semibold text-white block">AliTech_Course_Architecture_Blueprint.pdf</span>
                        <span className="text-[11px] text-slate-500">Official technical schematic · 4.2 MB</span>
                      </div>
                    </div>
                    <button
                      onClick={() => showNotification('Downloaded: AliTech_Course_Architecture_Blueprint.pdf')}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-lg text-xs font-medium flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-teal-400" />
                      <div>
                        <span className="font-semibold text-white block">CLI_Commands_Cheatsheet_Lusaka.pdf</span>
                        <span className="text-[11px] text-slate-500">Quick reference syntax guide · 1.8 MB</span>
                      </div>
                    </div>
                    <button
                      onClick={() => showNotification('Downloaded: CLI_Commands_Cheatsheet_Lusaka.pdf')}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-lg text-xs font-medium flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-2">
                  <textarea
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    rows={4}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-hidden focus:border-teal-500"
                    placeholder="Take timestamped notes for this lesson..."
                  />
                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span>Notes automatically saved to your local browser storage</span>
                    <button
                      onClick={() => showNotification('Notes saved!')}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-medium"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'discussion' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span className="font-semibold text-white">Mulenga B. (Student)</span>
                      <span>3 days ago</span>
                    </div>
                    <p className="text-slate-300">
                      Does the gcloud CLI lab require my own personal GCP credit card or is it provisioned in sandbox?
                    </p>
                    <div className="p-2.5 mt-2 rounded bg-slate-950 border border-slate-800 text-[11px] text-teal-300">
                      <span className="font-semibold block text-teal-400">Alinafe Nyirenda (Instructor):</span>
                      It runs 100% inside our AliTech browser-sandboxed cloud shell. No personal GCP account or credit card required!
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Curriculum & Lessons (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col h-full overflow-y-auto">
          <div className="p-4 border-b border-slate-800">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-400 block">Course Curriculum</span>
            <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
              <span>{allLessons.length} Lessons</span>
              <span className="font-mono text-teal-400">{progressPercent}% Completed</span>
            </div>
          </div>

          <div className="p-3 space-y-4 flex-1 overflow-y-auto">
            {course.modules.map((module, mIndex) => (
              <div key={module.id} className="space-y-1.5">
                <div className="px-2 py-1 text-xs font-semibold text-slate-300">
                  {module.title}
                </div>

                <div className="space-y-1">
                  {module.lessons.map((lesson) => {
                    const isCurrent = lesson.id === activeLesson.id;
                    const isCompleted = courseProgress.completedLessonIds.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setSelectedLessonId(lesson.id);
                          setIsPlaying(false);
                          setQuizSubmitted(false);
                        }}
                        className={`w-full p-2.5 rounded-xl text-left text-xs transition-colors flex items-center justify-between gap-3 ${
                          isCurrent
                            ? 'bg-teal-950/60 border border-teal-500/80 text-white font-medium'
                            : 'hover:bg-slate-800/60 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                          )}
                          <div className="truncate">
                            <span className="truncate block">{lesson.title}</span>
                            <span className="text-[10px] text-slate-500 capitalize">{lesson.type}</span>
                          </div>
                        </div>

                        <span className="text-[11px] font-mono text-slate-500 shrink-0">{lesson.duration}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Quick certificate banner if eligible */}
          {progressPercent >= 80 && (
            <div className="p-4 bg-teal-950/80 border-t border-teal-800/80 text-center space-y-2">
              <span className="text-xs font-bold text-teal-300 flex items-center justify-center gap-1.5">
                <Award className="w-4 h-4" /> Ready for Certificate!
              </span>
              <button
                onClick={handleClaimCertificate}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-extrabold transition-colors shadow-xs"
              >
                View & Print Certificate
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
