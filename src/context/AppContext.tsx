import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, User, UserRole, Certificate, Transaction, PromoCode, ForumTopic, Announcement, CourseCategory } from '../types';
import { INITIAL_COURSES, INITIAL_USERS, INITIAL_TRANSACTIONS, INITIAL_PROMO_CODES, INITIAL_FORUM_TOPICS, INITIAL_ANNOUNCEMENTS } from '../data/mockData';

export type ViewType =
  | 'home'
  | 'courses'
  | 'course-detail'
  | 'course-player'
  | 'student-dashboard'
  | 'instructor-dashboard'
  | 'admin-dashboard'
  | 'about'
  | 'corporate'
  | 'become-instructor'
  | 'community'
  | 'help'
  | 'contact'
  | 'verify';

interface ProgressData {
  completedLessonIds: string[];
  quizScores: Record<string, number>;
  labCompleted: Record<string, boolean>;
}

interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  currency: 'ZMW' | 'USD';
  setCurrency: (c: 'ZMW' | 'USD') => void;
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  promoCodes: PromoCode[];
  setPromoCodes: React.Dispatch<React.SetStateAction<PromoCode[]>>;
  forumTopics: ForumTopic[];
  setForumTopics: React.Dispatch<React.SetStateAction<ForumTopic[]>>;
  announcements: Announcement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
  progress: Record<string, ProgressData>;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  recordQuizScore: (courseId: string, quizId: string, score: number) => void;
  recordLabComplete: (courseId: string, labId: string) => void;
  getCourseProgressPercentage: (courseId: string) => number;
  enrollInCourse: (courseId: string, method: 'Airtel Money' | 'MTN Mobile Money' | 'Card' | 'Bank Transfer' | 'Free', phone?: string) => boolean;
  issueCertificate: (courseId: string) => Certificate;
  activePaymentCourse: Course | null;
  setActivePaymentCourse: (c: Course | null) => void;
  activeCertificate: Certificate | null;
  setActiveCertificate: (c: Certificate | null) => void;
  searchFilter: string;
  setSearchFilter: (s: string) => void;
  categoryFilter: CourseCategory | 'All';
  setCategoryFilter: (c: CourseCategory | 'All') => void;
  openCourse: (courseId: string) => void;
  startCoursePlayer: (courseId: string, lessonId?: string) => void;
  formatPrice: (zmw: number, usd: number) => string;
  verifyCertificateId: (certId: string) => Certificate | null;
  notificationMessage: string | null;
  showNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [activeRole, setActiveRole] = useState<UserRole>('student');
  const [currency, setCurrency] = useState<'ZMW' | 'USD'>('ZMW');

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('alitech_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [allUsers, setAllUsers] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]); // Chileshe Mwape
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(INITIAL_PROMO_CODES);
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>(INITIAL_FORUM_TOPICS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);

  const [activePaymentCourse, setActivePaymentCourse] = useState<Course | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<CourseCategory | 'All'>('All');
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  // Course progress tracking in memory + local storage
  const [progress, setProgress] = useState<Record<string, ProgressData>>(() => {
    const saved = localStorage.getItem('alitech_progress');
    if (saved) return JSON.parse(saved);
    return {
      'course-gcp-cloud-arch': {
        completedLessonIds: ['les-1-1'],
        quizScores: {},
        labCompleted: {}
      },
      'course-free-digital-skills': {
        completedLessonIds: ['les-free-1-1'],
        quizScores: { 'quiz-free': 96 },
        labCompleted: {}
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('alitech_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('alitech_courses', JSON.stringify(courses));
  }, [courses]);

  // When active role changes, switch active mock user
  useEffect(() => {
    if (activeRole === 'student') {
      setCurrentUser(allUsers[0]);
    } else if (activeRole === 'instructor') {
      setCurrentUser(allUsers[1]);
    } else if (activeRole === 'admin') {
      setCurrentUser(allUsers[2]);
    }
  }, [activeRole, allUsers]);

  const showNotification = (msg: string) => {
    setNotificationMessage(msg);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 4000);
  };

  const getCourseProgressPercentage = (courseId: string): number => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return 0;
    const allLessonIds: string[] = [];
    course.modules.forEach((m) => {
      m.lessons.forEach((l) => allLessonIds.push(l.id));
    });
    if (allLessonIds.length === 0) return 0;
    const courseProgress = progress[courseId];
    if (!courseProgress) return 0;
    const completedCount = allLessonIds.filter((id) =>
      courseProgress.completedLessonIds.includes(id)
    ).length;
    return Math.min(100, Math.round((completedCount / allLessonIds.length) * 100));
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    setProgress((prev) => {
      const currentCourseProgress = prev[courseId] || {
        completedLessonIds: [],
        quizScores: {},
        labCompleted: {}
      };
      if (currentCourseProgress.completedLessonIds.includes(lessonId)) {
        return prev;
      }
      const updated = {
        ...prev,
        [courseId]: {
          ...currentCourseProgress,
          completedLessonIds: [...currentCourseProgress.completedLessonIds, lessonId]
        }
      };
      return updated;
    });
    showNotification('Lesson marked as completed!');
  };

  const recordQuizScore = (courseId: string, quizId: string, score: number) => {
    setProgress((prev) => {
      const currentCourseProgress = prev[courseId] || {
        completedLessonIds: [],
        quizScores: {},
        labCompleted: {}
      };
      return {
        ...prev,
        [courseId]: {
          ...currentCourseProgress,
          quizScores: {
            ...currentCourseProgress.quizScores,
            [quizId]: score
          }
        }
      };
    });
  };

  const recordLabComplete = (courseId: string, labId: string) => {
    setProgress((prev) => {
      const currentCourseProgress = prev[courseId] || {
        completedLessonIds: [],
        quizScores: {},
        labCompleted: {}
      };
      return {
        ...prev,
        [courseId]: {
          ...currentCourseProgress,
          labCompleted: {
            ...currentCourseProgress.labCompleted,
            [labId]: true
          }
        }
      };
    });
    showNotification('Hands-on Cloud Lab verified successfully! All tasks completed.');
  };

  const issueCertificate = (courseId: string): Certificate => {
    const course = courses.find((c) => c.id === courseId);
    const existing = currentUser.certificates.find((c) => c.courseId === courseId);
    if (existing) {
      return existing;
    }
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newCert: Certificate = {
      id: `ALITECH-ZM-2026-${randNum}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      courseId: courseId,
      courseTitle: course ? course.title : 'Professional Tech Program',
      instructorName: course ? course.instructorName : 'Alinafe Nyirenda',
      issueDate: 'October 31, 2026',
      verificationCode: `ALITECH-VERIFY-${randNum}-ZM`,
      gradePercentage: 98,
      totalHours: course ? course.durationHours : 30,
      accreditedBy: 'AliTech Investments Ltd, Lusaka, Zambia'
    };

    setCurrentUser((prev) => ({
      ...prev,
      certificates: [...prev.certificates, newCert],
      completedCourseIds: Array.from(new Set([...prev.completedCourseIds, courseId]))
    }));

    return newCert;
  };

  const enrollInCourse = (
    courseId: string,
    method: 'Airtel Money' | 'MTN Mobile Money' | 'Card' | 'Bank Transfer' | 'Free',
    phone?: string
  ): boolean => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return false;

    // Check if already enrolled
    if (currentUser.enrolledCourseIds.includes(courseId)) {
      showNotification('You are already enrolled in this course.');
      return true;
    }

    const newTxn: Transaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      courseId: course.id,
      courseTitle: course.title,
      amountZMW: course.priceZMW,
      amountUSD: course.priceUSD,
      currency: currency,
      paymentMethod: method === 'Free' ? 'Card' : method,
      phoneNumber: phone,
      status: 'completed',
      date: new Date().toISOString().split('T')[0],
      referenceNumber: `${method.toUpperCase().slice(0, 3)}-ZM-${Math.floor(10000000 + Math.random() * 90000000)}`
    };

    setTransactions((prev) => [newTxn, ...prev]);

    setCurrentUser((prev) => ({
      ...prev,
      enrolledCourseIds: [...prev.enrolledCourseIds, courseId]
    }));

    showNotification(`Successfully enrolled in ${course.title}!`);
    return true;
  };

  const openCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('course-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startCoursePlayer = (courseId: string, lessonId?: string) => {
    setSelectedCourseId(courseId);
    const course = courses.find((c) => c.id === courseId);
    if (course && course.modules.length > 0 && course.modules[0].lessons.length > 0) {
      setSelectedLessonId(lessonId || course.modules[0].lessons[0].id);
    }
    setCurrentView('course-player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPrice = (zmw: number, usd: number): string => {
    if (zmw === 0 && usd === 0) return 'Free';
    if (currency === 'ZMW') {
      return `ZMW ${zmw.toLocaleString()}`;
    }
    return `$${usd.toLocaleString()}`;
  };

  const verifyCertificateId = (certId: string): Certificate | null => {
    const trimmed = certId.trim().toUpperCase();
    // Search in currentUser certificates and initial mock
    for (const u of allUsers) {
      const match = u.certificates.find(
        (c) => c.id.toUpperCase() === trimmed || c.verificationCode.toUpperCase() === trimmed
      );
      if (match) return match;
    }
    if (currentUser.certificates) {
      const match = currentUser.certificates.find(
        (c) => c.id.toUpperCase() === trimmed || c.verificationCode.toUpperCase() === trimmed
      );
      if (match) return match;
    }
    return null;
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedCourseId,
        setSelectedCourseId,
        selectedLessonId,
        setSelectedLessonId,
        activeRole,
        setActiveRole,
        currency,
        setCurrency,
        courses,
        setCourses,
        currentUser,
        setCurrentUser,
        allUsers,
        setAllUsers,
        transactions,
        setTransactions,
        promoCodes,
        setPromoCodes,
        forumTopics,
        setForumTopics,
        announcements,
        setAnnouncements,
        progress,
        markLessonComplete,
        recordQuizScore,
        recordLabComplete,
        getCourseProgressPercentage,
        enrollInCourse,
        issueCertificate,
        activePaymentCourse,
        setActivePaymentCourse,
        activeCertificate,
        setActiveCertificate,
        searchFilter,
        setSearchFilter,
        categoryFilter,
        setCategoryFilter,
        openCourse,
        startCoursePlayer,
        formatPrice,
        verifyCertificateId,
        notificationMessage,
        showNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
