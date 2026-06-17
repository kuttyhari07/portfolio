@echo off
title Hari Haran Portfolio Launcher
color 0A

echo ========================================
echo    Hari Haran Portfolio Launcher
echo ========================================
echo.

REM Check if MongoDB is installed
echo Checking MongoDB...
where mongod >nul 2>nul
if %errorlevel% neq 0 (
    echo MongoDB not found in PATH!
    echo Please make sure MongoDB is installed.
    echo Or use MongoDB Atlas instead.
    pause
    exit /b
)

echo Starting MongoDB...
start "MongoDB" mongod

timeout /t 3 /nobreak >nul

echo.
echo Starting Backend Server...
cd server
start "Backend Server" cmd /k npm run dev

cd ..

timeout /t 3 /nobreak >nul

echo.
echo Starting Frontend Client...
cd client
start "Frontend Client" cmd /k npm run dev

cd ..

echo.
echo ========================================
echo    All servers are starting!
echo ========================================
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo    Admin:    http://localhost:3000/admin/login
echo.
echo    Default Admin Credentials:
echo    Email: admin@hariharan.com
echo    Password: Admin@123456
echo ========================================
echo.
echo Close this window to stop all servers?
echo (Or press Ctrl+C in each window)
echo.

pause