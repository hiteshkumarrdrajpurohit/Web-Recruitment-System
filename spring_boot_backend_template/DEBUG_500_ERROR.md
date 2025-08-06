# Debugging 500 Error - Vacancy Creation

## Error Analysis
The 500 error when creating a vacancy indicates a server-side issue. Here's a step-by-step debugging guide:

## Step 1: Check Database Connection

1. **Verify MySQL is running:**
   ```bash
   # Check if MySQL is running on port 3306
   netstat -an | findstr 3306
   ```

2. **Test database connection:**
   ```bash
   curl http://localhost:8080/test-db
   ```

## Step 2: Check Server Logs

1. **Start the server with detailed logging:**
   ```bash
   cd spring_boot_backend_template
   mvn spring-boot:run
   ```

2. **Look for these specific errors in the console:**
   - Database connection errors
   - Validation errors
   - Entity mapping errors
   - Date parsing errors

## Step 3: Test API Endpoints

1. **Test basic connectivity:**
   ```bash
   curl http://localhost:8080/health
   curl http://localhost:8080/
   ```

2. **Test vacancy object creation:**
   ```bash
   curl http://localhost:8080/test-vacancy
   ```

3. **Test existing vacancies endpoint:**
   ```bash
   curl http://localhost:8080/vacancies
   ```

## Step 4: Common Issues and Solutions

### Issue 1: Database Connection
**Symptoms:** Connection refused, authentication failed
**Solution:** 
- Ensure MySQL is running
- Check credentials in `application.properties`
- Verify database `web_recruitment_system` exists

### Issue 2: Validation Errors
**Symptoms:** IllegalArgumentException in logs
**Solution:**
- Check all required fields are provided
- Verify data types (numbers for salary, dates for deadline)
- Ensure enum values match (FULL_TIME, ACTIVE, etc.)

### Issue 3: Date Format Issues
**Symptoms:** Date parsing errors
**Solution:**
- Frontend sends dates as "YYYY-MM-DD" format
- Backend expects LocalDate objects
- Check DateConfig.java for proper deserialization

### Issue 4: Entity Mapping Issues
**Symptoms:** JPA/Hibernate errors
**Solution:**
- Check entity annotations
- Verify table creation
- Check for missing required fields

## Step 5: Frontend Data Validation

Ensure the frontend sends all required fields:

```json
{
  "title": "Software Engineer",
  "department": "Engineering",
  "location": "New York",
  "employementType": "FULL_TIME",
  "description": "Brief description",
  "jobDescription": "Detailed description",
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

## Step 6: Manual Testing

1. **Use Postman or curl to test the API directly:**
   ```bash
   curl -X POST http://localhost:8080/vacancies \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Test Engineer",
       "department": "Engineering",
       "location": "Test Location",
       "employementType": "FULL_TIME",
       "description": "Test description",
       "jobDescription": "Test job description",
       "reponsibilites": "Test responsibilities",
       "minSalary": 50000,
       "maxSalary": 80000,
       "applicationDeadline": "2024-12-31",
       "requiredEducation": "Bachelor's Degree",
       "requiredExperience": "2+ years",
       "numberOfVacencies": 1,
       "shiftDetails": "9 AM - 6 PM",
       "status": "ACTIVE"
     }'
   ```

## Step 7: Check Application Properties

Verify these settings in `application.properties`:

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/web_recruitment_system?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=manager

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Logging
logging.level.com.sunbeam=DEBUG
logging.level.org.springframework.web=DEBUG
```

## Step 8: Quick Fixes

If you're still getting 500 errors:

1. **Restart the server:**
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart
   mvn spring-boot:run
   ```

2. **Clear and rebuild:**
   ```bash
   mvn clean compile
   mvn spring-boot:run
   ```

3. **Check for port conflicts:**
   ```bash
   netstat -an | findstr 8080
   ```

## Step 9: Enable Detailed Error Messages

The controller now includes detailed error messages. Check the response body for specific error details.

## Common Error Messages and Solutions

- **"Vacancy title cannot be empty"** → Fill in the title field
- **"Minimum salary must be greater than 0"** → Enter valid salary numbers
- **"Application deadline is required"** → Select a valid date
- **"Database connection failed"** → Check MySQL and credentials

## Next Steps

1. Run the test script: `test-api.bat`
2. Check server logs for specific error messages
3. Test with the manual curl command above
4. Verify all required fields are provided in the frontend form 