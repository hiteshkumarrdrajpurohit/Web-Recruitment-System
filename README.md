# Recruitment System - Backend & Frontend Integration

This project consists of a Spring Boot backend API and a React frontend for a recruitment system.

## Project Structure

```
cdac/
├── FrontEnd/                    # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── hr/             # HR-specific components
│   │   │   │   ├── Vacancies.jsx
│   │   │   │   ├── CreateVacancy.jsx
│   │   │   │   ├── EditVacancy.jsx
│   │   │   │   └── VacancyCard.jsx
│   │   │   └── applicants/     # Applicant-specific components
│   │   ├── services/
│   │   │   └── vacancy.js      # API service for vacancies
│   │   └── config.js           # API configuration
└── spring_boot_backend_template/  # Spring Boot backend
    ├── src/main/java/com/sunbeam/
    │   ├── controller/
    │   │   ├── VacancyController.java
    │   │   └── HealthController.java
    │   ├── service/
    │   │   ├── VacancyService.java
    │   │   └── impl/VacancyServiceImpl.java
    │   ├── repository/
    │   │   └── VacancyRepository.java
    │   └── entity/
    │       ├── Vacancy.java
    │       └── types/
    │           ├── JobType.java
    │           └── JobStatus.java
    └── src/main/resources/
        └── application.properties
```

## Setup Instructions

### 1. Database Setup

Make sure MySQL is running and accessible with:
- Host: localhost
- Port: 3306
- Username: root
- Password: manager
- Database: web_recruitment_system (will be created automatically)

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd spring_boot_backend_template
   ```

2. Start the Spring Boot server:
   ```bash
   # Option 1: Use the provided batch file
   start-server.bat
   
   # Option 2: Use Maven directly
   mvn spring-boot:run
   ```

3. The server will start on `http://localhost:8080`

4. Test the API endpoints:
   ```bash
   # Use the provided test script
   test-api.bat
   
   # Or test manually:
   curl http://localhost:8080/health
   curl http://localhost:8080/vacancies
   ```

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd FrontEnd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will start on `http://localhost:5173`

## API Endpoints

### Vacancies API

- `GET /vacancies` - Get all vacancies with pagination and search
- `GET /vacancies/active` - Get active job listings with filters
- `GET /vacancies/{id}` - Get vacancy by ID
- `POST /vacancies` - Create new vacancy
- `PUT /vacancies/{id}` - Update vacancy
- `DELETE /vacancies/{id}` - Delete vacancy

### Health Check

- `GET /health` - Health check endpoint
- `GET /` - Root endpoint

## Features Implemented

### Backend Features
- ✅ Complete CRUD operations for vacancies
- ✅ Pagination and search functionality
- ✅ Filtering by status, location, and job type
- ✅ Proper error handling and validation
- ✅ Database integration with MySQL
- ✅ CORS configuration for frontend integration

### Frontend Features
- ✅ Vacancy listing with search and filters
- ✅ Create new vacancy form
- ✅ Edit existing vacancies
- ✅ Delete vacancies
- ✅ Responsive design with Tailwind CSS
- ✅ Real-time API integration
- ✅ Error handling and user feedback

## Vacancy Data Structure

```json
{
  "title": "Software Engineer",
  "department": "Engineering",
  "location": "New York",
  "employementType": "FULL_TIME",
  "description": "Brief description",
  "jobDescription": "Detailed job description",
  "reponsibilites": "Key responsibilities",
  "minSalary": 80000,
  "maxSalary": 120000,
  "applicationDeadline": "2024-12-31",
  "requiredEducation": "Bachelor's Degree",
  "requiredExperience": "3+ years",
  "numberOfVacencies": 2,
  "shiftDetails": "9 AM - 6 PM",
  "status": "ACTIVE"
}
```

## Job Types
- `FULL_TIME`
- `PART_TIME`
- `CONTRACT`
- `INTERNSHIP`

## Job Status
- `DRAFT`
- `ACTIVE`
- `CLOSED`
- `CANCELLED`

## Troubleshooting

### Common Issues

1. **"No response from server" error**
   - Ensure MySQL is running
   - Check if the backend server is started
   - Verify database credentials in `application.properties`

2. **CORS errors**
   - Backend CORS is configured for `http://localhost:5173` and `http://localhost:3000`
   - Make sure frontend is running on one of these ports

3. **Database connection issues**
   - Verify MySQL is running on port 3306
   - Check username/password in `application.properties`
   - Ensure database `web_recruitment_system` exists or can be created

4. **Frontend not loading vacancies**
   - Check browser console for API errors
   - Verify backend is running on `http://localhost:8080`
   - Check network tab for failed requests

### Debug Steps

1. Check backend logs for errors
2. Test API endpoints directly with curl or Postman
3. Check browser console for frontend errors
4. Verify all required fields are filled in the create vacancy form

## Development Notes

- The backend uses Spring Boot 3.5.3 with Java 21
- Frontend uses React with Vite and Tailwind CSS
- Database uses MySQL with JPA/Hibernate
- CORS is configured to allow frontend-backend communication
- Error handling is implemented on both frontend and backend

## Next Steps

To enhance the system, consider adding:
- User authentication and authorization
- File upload for resumes
- Email notifications
- Advanced search and filtering
- Dashboard analytics
- Interview scheduling
- Application tracking 