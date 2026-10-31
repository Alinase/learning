import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import {
  ShieldCheck,
  Cloud,
  BrainCircuit,
  BarChart3,
  Code2,
  Network,
  Cpu,
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  Users,
  Smartphone,
  BookOpen,
  Calendar,
  Star
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { courses, setCurrentView, openCourse, setCategoryFilter, formatPrice, setActivePaymentCourse } = useApp();

  const featuredCourses = courses.filter((c) => c.featured);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-teal-600" />;
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5 text-teal-600" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-teal-600" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-teal-600" />;
      case 'Network': return <Network className="w-5 h-5 text-teal-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-teal-600" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-teal-600" />;
      default: return <Sparkles className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 lg:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wide uppercase">
                <span>AliTech Investments Ltd</span>
                <span aria-hidden="true">·</span>
                <span>Lusaka, Zambia</span>
                <span aria-hidden="true">·</span>
                <span>Global Technology Standard</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] text-balance">
                Accelerate Your Tech Career With Certified African & Global Skills
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Master Cloud Computing, Cybersecurity, Artificial Intelligence, and Software Engineering. Built for
                ambitious African learners and corporate teams with practical browser-based labs, local Mobile Money
                checkout, and verified professional certifications.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setCurrentView('courses')}
                  className="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                  <span>Explore 9 Learning Tracks</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentView('corporate')}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-sm font-semibold transition-colors"
                >
                  Corporate & Institutional Training
                </button>
              </div>

              {/* Trust Badges: Zero pills, clean typographic layout */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-xs text-slate-600">
                <div>
                  <span className="font-extrabold text-slate-900 text-base sm:text-lg block">5,400+</span>
                  <span className="text-slate-500">Learners Trained</span>
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 text-base sm:text-lg block">Airtel & MTN</span>
                  <span className="text-slate-500">Native MoMo Pay</span>
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 text-base sm:text-lg block">100% Verified</span>
                  <span className="text-slate-500">Digital Credentials</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] lg:aspect-[5/4] relative group">
                <img
                  src="/src/assets/images/alitech_hero_learning_1793474031264.jpg"
                  alt="AliTech learners in Lusaka technology training academy"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-xs font-semibold text-teal-300 tracking-wider uppercase block">
                    Lusaka Innovation Campus
                  </span>
                  <p className="text-sm font-bold leading-snug">
                    Hands-on cloud architecture and cyber defense labs designed for real enterprise deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9 Main Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
              Comprehensive Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Explore 9 Professional Learning Categories
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('courses')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 self-start md:self-auto"
          >
            <span>View all courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.name}
              onClick={() => {
                setCategoryFilter(cat.name);
                setCurrentView('courses');
              }}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  {getCategoryIcon(cat.icon)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {idx + 1}. {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cat.description}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{cat.courseCount} Courses available</span>
                <span className="text-teal-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  Browse track <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses Spotlight */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
                Highest Rated & Industry Demanded
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Featured Technology Courses</h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Every course combines video lectures, downloadable guides, interactive browser labs, and verified certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                      {course.level}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span className="text-teal-700 font-semibold truncate max-w-[200px]">{course.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.durationHours} hrs</span>
                    </div>

                    <h3
                      onClick={() => openCourse(course.id)}
                      className="text-base font-bold text-slate-900 hover:text-teal-700 transition-colors cursor-pointer leading-snug line-clamp-2"
                    >
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{course.tagline}</p>

                    {course.certificationPrep && (
                      <div className="p-2.5 rounded-lg bg-teal-50/70 border border-teal-100 text-[11px] text-teal-900 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        <span className="truncate">{course.certificationPrep}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer price & action */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Enrolment Fee</span>
                    <span className="text-base font-extrabold text-slate-900">
                      {formatPrice(course.priceZMW, course.priceUSD)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openCourse(course.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      Syllabus
                    </button>
                    <button
                      onClick={() => setActivePaymentCourse(course)}
                      className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                    >
                      {course.priceZMW === 0 ? 'Enrol Free' : 'Enrol Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate & Institutional Training Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
                Enterprise & Government Solutions
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Upskill Entire Tech Teams Across Banking, Telecom & Mining
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                AliTech delivers custom corporate training packages, on-premise cloud migrations, and cybersecurity
                readiness drills tailored to the Zambian regulatory landscape. Dedicated progress tracking, enterprise
                invoicing, and private instructor-led cohorts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Custom enterprise learning paths</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Executive dashboards & progress tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Zambian Data Protection Act compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Flexible invoicing in ZMW or USD</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentView('corporate')}
                  className="px-5 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-xs"
                >
                  Request Corporate Training Proposal
                </button>
                <button
                  onClick={() => setCurrentView('contact')}
                  className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-xl border border-slate-700 transition-colors"
                >
                  Schedule Executive Call
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700 aspect-video">
                <img
                  src="/src/assets/images/corporate_training_session_1793474033389.jpg"
                  alt="Corporate executive technology training in Lusaka"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why AliTech & Trust Elements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Why AliTech eLearning</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Engineered For The African Tech Frontier
          </h2>
          <p className="text-xs text-slate-500">
            Built from Lusaka, Zambia to serve African innovators with global-tier curriculum and frictionless local access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Seamless Mobile Money</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enrol instantly using your Airtel Money or MTN Mobile Money wallet in Zambian Kwacha (ZMW) with real-time USSD push authorization.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Verifiable Credentials</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every certificate carries an encrypted verification ID and QR code, trusted by employers and institutions throughout Africa.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Instructor-Led Mastery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct access to senior cloud architects and cyber specialists with interactive weekly live virtual reviews and dedicated discussion boards.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
