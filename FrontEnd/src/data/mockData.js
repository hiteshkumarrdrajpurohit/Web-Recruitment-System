

// Converted from mockData.ts to mockData.js

// Remove all TypeScript types and interfaces, keep only the data and functions.

export const mockVacancies = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Bengaluru, Karnataka',
    type: 'Full-time',
    description: 'We are looking for a Senior Software Engineer to join our growing engineering team. You will be responsible for designing, developing, and maintaining scalable web applications.',
    requirements: ['5+ years experience in software development', 'Proficiency in React/TypeScript', 'Experience with Node.js and Express', 'Knowledge of AWS cloud services', 'Strong problem-solving skills'],
    salary: { min: 1800000, max: 3000000, currency: 'INR' },
    status: 'Open',
    postedDate: '2025-01-15',
    deadline: '2025-02-15',
    applicantCount: 24,
    createdBy: 'HR001'
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'Mumbai, Maharashtra',
    type: 'Full-time',
    description: 'Seeking an experienced Product Manager to drive product strategy and execution. You will work closely with engineering, design, and business teams.',
    requirements: ['3+ years PM experience', 'Experience with Agile methodology', 'Strong analytical and data analysis skills', 'Excellent stakeholder management', 'MBA preferred'],
    salary: { min: 1500000, max: 2500000, currency: 'INR' },
    status: 'Open',
    postedDate: '2025-01-10',
    deadline: '2025-02-10',
    applicantCount: 18,
    createdBy: 'HR001'
  },
  {
    id: '3',
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Remote (India)',
    type: 'Full-time',
    description: 'Join our marketing team to create and execute innovative marketing campaigns. You will be responsible for digital marketing, content creation, and campaign analysis.',
    requirements: ['2+ years marketing experience', 'Digital marketing expertise', 'Content creation skills', 'Google Analytics proficiency', 'Social media management'],
    salary: { min: 800000, max: 1200000, currency: 'INR' },
    status: 'Open',
    postedDate: '2025-01-20',
    deadline: '2025-02-20',
    applicantCount: 31,
    createdBy: 'HR002'
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Hyderabad, Telangana',
    type: 'Full-time',
    description: 'Looking for a DevOps Engineer to manage our infrastructure and deployment pipelines. You will work on automation, monitoring, and scalability.',
    requirements: ['3+ years DevOps experience', 'Docker and Kubernetes', 'AWS/Azure cloud platforms', 'CI/CD pipeline management', 'Infrastructure as Code'],
    salary: { min: 1200000, max: 1800000, currency: 'INR' },
    status: 'On Hold',
    postedDate: '2025-01-05',
    deadline: '2025-02-05',
    applicantCount: 12,
    createdBy: 'HR001'
  }
];

export const mockApplicants = [
  {
    id: '1',
    firstName: 'Amit',
    lastName: 'Sharma',
    email: 'amit.sharma@email.in',
    phone: '+91-9876543210',
    position: 'Senior Software Engineer',
    experience: 6,
    education: 'MS Computer Science - IIT Bombay',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
    resumeUrl: '/resumes/amit-sharma.pdf',
    status: 'Interview Scheduled',
    appliedDate: '2025-01-16',
    vacancyId: '1',
    notes: 'Strong technical background, excellent communication skills. Previous experience at top Indian tech companies.',
    score: 85
  },
  {
    id: '2',
    firstName: 'Priya',
    lastName: 'Verma',
    email: 'priya.verma@email.in',
    phone: '+91-9123456780',
    position: 'Product Manager',
    experience: 4,
    education: 'MBA - IIM Ahmedabad, BTech - IIT Delhi',
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Roadmapping', 'Stakeholder Management'],
    resumeUrl: '/resumes/priya-verma.pdf',
    status: 'Interviewed',
    appliedDate: '2025-01-12',
    vacancyId: '2',
    notes: 'Great PM experience at previous Indian startup. Strong analytical skills and business acumen.',
    score: 92
  },
  {
    id: '3',
    firstName: 'Rahul',
    lastName: 'Patel',
    email: 'rahul.patel@email.in',
    phone: '+91-9988776655',
    position: 'Marketing Specialist',
    experience: 3,
    education: 'BA Marketing - Delhi University',
    skills: ['Digital Marketing', 'SEO', 'Content Marketing', 'Google Analytics', 'Social Media'],
    resumeUrl: '/resumes/rahul-patel.pdf',
    status: 'Shortlisted',
    appliedDate: '2025-01-21',
    vacancyId: '3',
    notes: 'Creative portfolio, strong digital marketing background. Good cultural fit.',
    score: 78
  },
  {
    id: '4',
    firstName: 'Sneha',
    lastName: 'Reddy',
    email: 'sneha.reddy@email.in',
    phone: '+91-9090909090',
    position: 'Senior Software Engineer',
    experience: 8,
    education: 'MS Software Engineering - BITS Pilani',
    skills: ['React', 'Python', 'AWS', 'Microservices', 'Team Leadership'],
    resumeUrl: '/resumes/sneha-reddy.pdf',
    status: 'Hired',
    appliedDate: '2025-01-08',
    vacancyId: '1',
    notes: 'Exceptional candidate with strong leadership experience. Perfect fit for senior role.',
    score: 96
  },
  {
    id: '5',
    firstName: 'Vikram',
    lastName: 'Singh',
    email: 'vikram.singh@email.in',
    phone: '+91-9876501234',
    position: 'DevOps Engineer',
    experience: 5,
    education: 'BTech Computer Science - NIT Trichy',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins'],
    resumeUrl: '/resumes/vikram-singh.pdf',
    status: 'Reviewed',
    appliedDate: '2025-01-18',
    vacancyId: '4',
    notes: 'Solid DevOps background with good cloud experience.',
    score: 82
  }
];

export const mockInterviews = [
  {
    id: '1',
    applicantId: '1',
    vacancyId: '1',
    type: 'Technical',
    scheduledDate: '2025-01-25T14:00:00',
    duration: 90,
    interviewer: 'Rohit Mehra',
    interviewerEmail: 'rohit.mehra@company.in',
    location: 'Conference Room A',
    status: 'Scheduled',
    notes: 'Technical interview focusing on React, system design, and coding challenges',
    round: 2
  },
  {
    id: '2',
    applicantId: '2',
    vacancyId: '2',
    type: 'Video',
    scheduledDate: '2025-01-24T10:00:00',
    duration: 60,
    interviewer: 'Anjali Gupta',
    interviewerEmail: 'anjali.gupta@company.in',
    meetingLink: 'https://zoom.us/j/123456789',
    status: 'Completed',
    notes: 'Product management interview covering strategy and execution',
    round: 1,
    result: {
      id: '1',
      interviewId: '2',
      rating: 4,
      technicalSkills: 4,
      communication: 5,
      problemSolving: 4,
      culturalFit: 5,
      feedback: 'Excellent candidate with strong product sense and communication skills. Demonstrated clear thinking and strategic approach to product challenges.',
      strengths: ['Product strategy', 'Stakeholder management', 'Data-driven approach', 'Clear communication'],
      concerns: ['Limited experience with technical teams', 'May need support with engineering coordination'],
      recommendation: 'Recommend',
      nextSteps: 'Schedule final round with VP of Product',
      evaluatedBy: 'Anjali Gupta',
      evaluatedDate: '2025-01-24T11:00:00'
    }
  },
  {
    id: '3',
    applicantId: '4',
    vacancyId: '1',
    type: 'Final Round',
    scheduledDate: '2025-01-20T15:00:00',
    duration: 45,
    interviewer: 'Suresh Nair',
    interviewerEmail: 'suresh.nair@company.in',
    location: 'Executive Conference Room',
    status: 'Completed',
    notes: 'Final interview with HR and hiring manager',
    round: 3,
    result: {
      id: '2',
      interviewId: '3',
      rating: 5,
      technicalSkills: 5,
      communication: 5,
      problemSolving: 5,
      culturalFit: 5,
      feedback: 'Outstanding candidate who exceeded expectations in all areas. Strong technical leadership and excellent cultural fit.',
      strengths: ['Technical expertise', 'Leadership experience', 'Cultural alignment', 'Problem-solving'],
      concerns: [],
      recommendation: 'Strongly Recommend',
      nextSteps: 'Extend offer immediately',
      evaluatedBy: 'Suresh Nair',
      evaluatedDate: '2025-01-20T16:00:00'
    }
  }
];

export const mockUser = {
  id: 'HR001',
  name: 'Neha Kapoor',
  email: 'neha.kapoor@company.in',
  role: 'HR Manager',
  department: 'Human Resources',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  permissions: ['create_vacancy', 'manage_applicants', 'schedule_interviews', 'view_reports', 'manage_users'],
  isActive: true
};

export const mockHiringDecisions = [
  {
    id: '1',
    applicantId: '4',
    vacancyId: '1',
    decision: 'Hire',
    reason: 'Exceptional technical skills and leadership experience. Perfect fit for senior role.',
    salaryOffered: 2500000,
    startDate: '2025-02-15',
    decidedBy: 'HR001',
    decidedDate: '2025-01-21T10:00:00',
    notes: 'Offer accepted. Start date confirmed.'
  }
];

