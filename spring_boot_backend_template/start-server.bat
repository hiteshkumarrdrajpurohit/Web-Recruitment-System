@echo off
echo Starting Spring Boot Server...
echo.
echo Make sure MySQL is running on port 3306
echo Database: web_recruitment_system
echo Username: root
echo Password: manager
echo.
echo Server will start on: http://localhost:8080
echo Health check: http://localhost:8080/health
echo.
pause
mvn spring-boot:run 