@echo off
echo Testing Spring Boot API endpoints...
echo.

echo 1. Testing health endpoint...
curl -X GET http://localhost:8080/health
echo.
echo.

echo 2. Testing root endpoint...
curl -X GET http://localhost:8080/
echo.
echo.

echo 3. Testing vacancies endpoint...
curl -X GET http://localhost:8080/vacancies
echo.
echo.

echo 4. Testing active vacancies endpoint...
curl -X GET http://localhost:8080/vacancies/active
echo.
echo.

echo 5. Testing database connection...
curl -X GET http://localhost:8080/test-db
echo.
echo.

echo 6. Testing vacancy object creation...
curl -X GET http://localhost:8080/test-vacancy
echo.
echo.

pause 