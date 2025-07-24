# Recruitment Process System

A comprehensive web-based recruitment management system built with React.js and designed to integrate with Spring Boot backend.

## Features

### Core Functionality
- **Vacancy Management**: Create, edit, delete, and manage job postings
- **Applicant Management**: Store and manage candidate data with advanced search and filtering
- **Interview Scheduling**: Schedule, manage, and track interviews with calendar integration
- **Interview Results**: Record detailed interview evaluations and feedback
- **Hiring Decisions**: Make and track hiring decisions with offer management
- **Reports & Analytics**: Generate recruitment metrics and performance reports

### HR Role Capabilities
- Create and manage job vacancies
- Search and shortlist applicants
- Schedule and conduct interviews
- Record interview results and evaluations
- Make hiring decisions
- Generate recruitment reports
- Manage user accounts and permissions

## Technology Stack

### Frontend
- **React.js 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and development server

### Backend Integration (Ready for Spring Boot)
- RESTful API service layer
- JWT authentication support
- Comprehensive error handling
- Type-safe API contracts

## Project Structure

```
src/
├── components/          # React components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── Dashboard.tsx   # Overview dashboard
│   ├── Vacancies.tsx   # Job posting management
│   ├── Applicants.tsx  # Candidate management
│   ├── Interviews.tsx  # Interview scheduling
│   ├── Hiring.tsx      # Hiring decisions
│   ├── Reports.tsx     # Analytics and reports
│   └── Settings.tsx    # User settings
├── services/           # API service layer
│   └── api.ts         # Spring Boot API integration
├── types/             # TypeScript type definitions
│   └── index.ts       # Data models
├── data/              # Mock data for development
│   └── mockData.ts    # Sample data
└── App.tsx            # Main application component
```

## Key Features

### Dashboard
- Real-time recruitment metrics
- Recent applicant overview
- Upcoming interview schedule
- Quick action buttons
- Urgent task notifications

### Vacancy Management
- Create new job postings with detailed requirements
- Edit existing vacancies
- Manage vacancy status (Open/Closed/On Hold)
- Track application counts
- Set application deadlines

### Applicant Management
- Comprehensive candidate profiles
- Advanced search and filtering
- Status tracking throughout recruitment process
- Resume management
- Interview history
- Scoring and evaluation

### Interview System
- Multiple interview types (Phone, Video, In-person, Technical)
- Calendar integration
- Interview scheduling with conflict detection
- Detailed result recording
- Multi-round interview support
- Interviewer assignment

### Hiring Management
- Candidate evaluation dashboard
- Hiring decision workflow
- Offer management
- Salary negotiation tracking
- Start date coordination
- Decision history

### Reports & Analytics
- Recruitment performance metrics
- Hiring funnel analysis
- Department-wise statistics
- Time-to-hire tracking
- Interview success rates
- Exportable reports

## Spring Boot Integration

The frontend is designed to integrate seamlessly with a Spring Boot backend:

### API Endpoints Structure
```
/api/vacancies          # Vacancy management
/api/applicants         # Applicant data
/api/interviews         # Interview scheduling
/api/hiring            # Hiring decisions
/api/reports           # Analytics
/api/users             # User management
/api/auth              # Authentication
```

### Data Models
- Comprehensive TypeScript interfaces
- Matches Spring Boot entity structure
- Ready for JPA/Hibernate integration
- Validation-ready models

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Environment Configuration

Create a `.env` file for Spring Boot backend integration:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_AUTH_ENABLED=true
```

## HR User Roles

- **HR Manager**: Full system access, hiring decisions
- **HR Associate**: Applicant management, interview scheduling
- **Recruiter**: Vacancy posting, candidate sourcing
- **Admin**: System configuration, user management
- **Interviewer**: Interview conduct, result submission

## Security Features

- JWT token-based authentication
- Role-based access control
- Secure API communication
- Session management
- Data validation

## Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface
- Accessible design patterns

## Future Enhancements

- Email integration for notifications
- Calendar sync (Google Calendar, Outlook)
- Document management system
- Advanced reporting with charts
- Bulk operations
- API rate limiting
- Real-time notifications

This system provides a complete foundation for recruitment management and is ready for Spring Boot backend integration.