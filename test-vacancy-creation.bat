@echo off
echo Testing Vacancy Creation API...
echo.

echo 1. Testing server health...
curl -X GET http://localhost:8080/health
echo.
echo.

echo 2. Testing database connection...
curl -X GET http://localhost:8080/test-db
echo.
echo.

echo 3. Testing vacancy object creation...
curl -X GET http://localhost:8080/test-vacancy
echo.
echo.

echo 4. Testing actual vacancy creation with minimal data...
curl -X POST http://localhost:8080/vacancies ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Test Engineer\",\"department\":\"Engineering\",\"location\":\"Test Location\",\"employementType\":\"FULL_TIME\",\"description\":\"Test description\",\"jobDescription\":\"Test job description\",\"reponsibilites\":\"Test responsibilities\",\"minSalary\":50000,\"maxSalary\":80000,\"applicationDeadline\":\"2024-12-31\",\"requiredEducation\":\"Bachelor's Degree\",\"requiredExperience\":\"2+ years\",\"numberOfVacencies\":1,\"shiftDetails\":\"9 AM - 6 PM\",\"status\":\"ACTIVE\"}"
echo.
echo.

pause 