import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { CourseCategory, CourseLevel, CourseFormat } from '../types';
import { Search, Filter, Award, Clock, Star, ArrowRight, RotateCcw } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const {
    courses,
    openCourse,
    formatPrice,
    setActivePaymentCourse,
    categoryFilter,
    setCategoryFilter,
    searchFilter,
    setSearchFilter
  } = useApp();

  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | 'All'>('All');
  const [selectedFormat, setSelectedFormat] = useState<CourseFormat | 'All'>('All');
  const [selectedPriceType, setSelectedPriceType] = useState<'All' | 'Free' | 'Paid'>('All');

  const filteredCourses = courses.filter((c) => {
    // Category match
    if (categoryFilter !== 'All' && c.category !== categoryFilter) {
      return false;
    }
    // Search match
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchTag = c.tagline.toLowerCase().includes(q);
      const matchCategory = c.category.toLowerCase().includes(q);
      const matchPrep = c.certificationPrep?.toLowerCase().includes(q);
      if (!matchTitle && !matchTag && !matchCategory && !matchPrep) return false;
    }
    // Level match
    if (selectedLevel !== 'All' && c.level !== selectedLevel) {
      return false;
    }
    // Format match
    if (selectedFormat !== 'All' && c.format !== selectedFormat) {
      return false;
    }
    // Price match
    if (selectedPriceType === 'Free' && c.priceZMW !== 0) return false;
    if (selectedPriceType === 'Paid' && c.priceZMW === 0) return false;

    return true;
  });

  const handleResetFilters = () => {
    setCategoryFilter('All');
    setSearchFilter('');
    setSelectedLevel('All');
    setSelectedFormat('All');
    setSelectedPriceType('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 tracking-wider uppercase">
          <span>Technology Catalog</span>
          <span aria-hidden="true">·</span>
          <span>9 Professional Domains</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore AliTech Courses & Certifications
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Learn cutting-edge skills from certified instructors with real-world African enterprise relevance. Hands-on
          browser labs included with every course.
        </p>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search by title, technology (e.g. GCP, Python, React, Cisco, Security+)..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Categories Segmented Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setCategoryFilter('All')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              categoryFilter === 'All'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All Tracks ({courses.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setCategoryFilter(cat.name)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                categoryFilter === cat.name
                  ? 'bg-teal-600 text-white font-semibold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Secondary dropdown filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Level Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-hidden"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Format Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Format:</span>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-hidden"
              >
                <option value="All">All Formats</option>
                <option value="self-paced">Self-Paced Online</option>
                <option value="instructor-led">Instructor-Led</option>
                <option value="live-virtual">Live Virtual Classes</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Price:</span>
              <select
                value={selectedPriceType}
                onChange={(e) => setSelectedPriceType(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-hidden"
              >
                <option value="All">All Courses</option>
                <option value="Free">Free Community Courses</option>
                <option value="Paid">Paid / Professional</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-mono text-[11px]">
              Showing {filteredCourses.length} of {courses.length} courses
            </span>
            <button
              onClick={handleResetFilters}
              className="px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3">
          <p className="text-base font-semibold text-slate-800">No courses match your filter criteria.</p>
          <p className="text-xs text-slate-500">Try adjusting your search terms or clearing selected filters.</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg text-xs font-semibold"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
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
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
                    {course.level}
                  </div>
                  <div className="absolute top-3 right-3 bg-teal-900/80 backdrop-blur-xs text-teal-200 text-[11px] font-semibold px-2 py-0.5 rounded-md capitalize">
                    {course.format.replace('-', ' ')}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
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
                    <div className="p-2 rounded-lg bg-teal-50/70 border border-teal-100 text-[11px] text-teal-900 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                      <span className="truncate">{course.certificationPrep}</span>
                    </div>
                  )}

                  {/* Instructor row */}
                  <div className="pt-2 flex items-center gap-2 text-xs text-slate-600">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructorName}
                      className="w-6 h-6 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="truncate">{course.instructorName}</span>
                  </div>
                </div>
              </div>

              {/* Price & Action Footer */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between">
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
      )}
    </div>
  );
};
