# Step-by-Step Debugging for 500 Error

## Immediate Steps to Take:

### 1. Check if Server is Running
```bash
# Check if port 8080 is in use
netstat -an | findstr 8080

# If not running, start the server:
cd spring_boot_backend_template
mvn spring-boot:run
```

### 2. Test Basic Connectivity
```bash
# Test health endpoint
curl http://localhost:8080/health

# Test root endpoint  
curl http://localhost:8080/
```

### 3. Test Database Connection
```bash
# Test database connection
curl http://localhost:8080/test-db

# Test database connection with repository
curl http://localhost:8080/test-db-connection
```

### 4. Test Vacancy Object Creation
```bash
# Test vacancy object creation (without database save)
curl http://localhost:8080/test-vacancy
```

### 5. Test Validation Endpoint
```bash
# Test validation without database save
curl -X POST http://localhost:8080/test-vacancy-validation \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test\",\"department\":\"Test\"}"
```

### 6. Check Server Logs
Look at the server console output for:
- Database connection errors
- Validation errors
- Entity mapping errors
- Date parsing errors

### 7. Test Frontend with Enhanced Logging
1. Open browser console (F12)
2. Try to create a vacancy
3. Check the console for:
   - The data being sent
   - The error response details

## Common Issues and Quick Fixes:

### Issue 1: MySQL Not Running
**Solution:**
- Start MySQL service
- Check credentials in `application.properties`

### Issue 2: Database Connection Failed
**Solution:**
- Verify MySQL is running on port 3306
- Check username/password: root/manager
- Ensure database `web_recruitment_system` exists

### Issue 3: Missing Required Fields
**Solution:**
- Ensure all form fields are filled
- Check data types (numbers for salary, dates for deadline)

### Issue 4: Date Format Issues
**Solution:**
- Frontend sends: "2024-12-31"
- Backend expects: LocalDate object
- Check DateConfig.java is working

### Issue 5: Enum Value Issues
**Solution:**
- Use exact enum values: FULL_TIME, ACTIVE, etc.
- Check JobType.java and JobStatus.java

## Quick Test Commands:

### Test 1: Basic Server Health
```bash
curl http://localhost:8080/health
```

### Test 2: Database Connection
```bash
curl http://localhost:8080/test-db
```

### Test 3: Vacancy Object Creation
```bash
curl http://localhost:8080/test-vacancy
```

### Test 4: Manual Vacancy Creation
```bash
curl -X POST http://localhost:8080/vacancies \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test Engineer\",\"department\":\"Engineering\",\"location\":\"Test Location\",\"employementType\":\"FULL_TIME\",\"description\":\"Test description\",\"jobDescription\":\"Test job description\",\"reponsibilites\":\"Test responsibilities\",\"minSalary\":50000,\"maxSalary\":80000,\"applicationDeadline\":\"2024-12-31\",\"requiredEducation\":\"Bachelor's Degree\",\"requiredExperience\":\"2+ years\",\"numberOfVacencies\":1,\"shiftDetails\":\"9 AM - 6 PM\",\"status\":\"ACTIVE\"}"
```

## What to Look For:

### In Server Console:
- Database connection messages
- Validation error messages
- Stack traces
- SQL queries

### In Browser Console:
- Request payload
- Response status
- Error message details
- Network tab for request/response

### In Network Tab:
- Request URL: `http://localhost:8080/vacancies`
- Request method: POST
- Request payload (JSON)
- Response status: 500
- Response body (error details)

## Next Steps After Testing:

1. **If basic endpoints work but vacancy creation fails:**
   - Check validation logic
   - Check database table creation
   - Check entity mapping

2. **If database connection fails:**
   - Start MySQL
   - Check credentials
   - Check database exists

3. **If validation fails:**
   - Check all required fields
   - Check data types
   - Check enum values

4. **If still getting 500:**
   - Check server logs for specific error
   - Test with minimal data
   - Check for missing dependencies 