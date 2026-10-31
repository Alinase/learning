export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title?: string;
  bio?: string;
  location: string;
  enrolledCourseIds: string[];
  completedCourseIds: string[];
  certificates: Certificate[];
  createdAt: string;
}

export type CourseCategory =
  | 'Cybersecurity and Information Security'
  | 'Cloud Computing (Google Cloud, Azure, AWS)'
  | 'Artificial Intelligence and Machine Learning'
  | 'Data Analytics and Data Science'
  | 'Software Development and Programming'
  | 'Networking and IT Infrastructure'
  | 'Digital Transformation'
  | 'Business and Entrepreneurship'
  | 'Professional Development and Digital Skills';

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
export type CourseFormat = 'self-paced' | 'instructor-led' | 'live-virtual';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  passingScore: number; // percentage, e.g. 80
  questions: QuizQuestion[];
}

export interface LabTask {
  id: string;
  instruction: string;
  expectedCommand: string; // or regex pattern
  outputHint: string;
  completed?: boolean;
}

export interface PracticalLab {
  id: string;
  title: string;
  environment: 'linux-bash' | 'gcloud-cli' | 'aws-cli' | 'python-env' | 'cyber-audit';
  prompt: string;
  initialDirectory: string;
  tasks: LabTask[];
  guideMarkdown: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "18 mins"
  type: 'video' | 'lab' | 'quiz' | 'reading';
  videoUrl?: string;
  contentMarkdown?: string;
  quiz?: Quiz;
  lab?: PracticalLab;
  downloadResources?: {
    name: string;
    fileSize: string;
    type: string;
    url?: string;
  }[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  format: CourseFormat;
  durationHours: number;
  rating: number;
  reviewCount: number;
  enrolledCount: number;
  priceZMW: number; // in Zambian Kwacha (0 = free)
  priceUSD: number; // in USD
  thumbnail: string;
  instructorId: string;
  instructorName: string;
  instructorTitle: string;
  instructorAvatar: string;
  instructorBio: string;
  learningObjectives: string[];
  prerequisites: string[];
  certificationPrep?: string; // e.g. "Prepares for Google Cloud Associate Cloud Engineer"
  modules: Module[];
  published: boolean;
  featured: boolean;
  updatedAt: string;
}

export interface Certificate {
  id: string; // unique ID e.g. ALITECH-ZM-2026-8941
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  instructorName: string;
  issueDate: string;
  verificationCode: string;
  gradePercentage: number;
  totalHours: number;
  accreditedBy: string; // "AliTech Investments Ltd, Lusaka, Zambia"
}

export interface LiveClass {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  instructorName: string;
  scheduledTime: string; // ISO string
  durationMinutes: number;
  meetingLink: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  agenda: string[];
}

export interface Transaction {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  amountZMW: number;
  amountUSD: number;
  currency: 'ZMW' | 'USD';
  paymentMethod: 'Airtel Money' | 'MTN Mobile Money' | 'Card' | 'Bank Transfer';
  phoneNumber?: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  referenceNumber: string;
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  expiresAt: string;
  usageCount: number;
  active: boolean;
}

export interface ForumTopic {
  id: string;
  courseId?: string;
  category: string;
  title: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  upvotes: number;
  replies: {
    id: string;
    authorName: string;
    authorRole: string;
    authorAvatar: string;
    content: string;
    createdAt: string;
    isInstructorAnswer?: boolean;
  }[];
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  priority: 'info' | 'important' | 'urgent';
  targetAudience: 'all' | 'students' | 'instructors';
}
