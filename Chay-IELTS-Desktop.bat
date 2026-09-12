@echo off
title IELTS Mastery 7.5 Desktop Launcher
chcp 65001 >nul
echo ========================================================
echo       KHỞI ĐỘNG ỨNG DỤNG IELTS MASTERY 7.5 DESKTOP
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/3] Đang kiểm tra trạng thái máy chủ (Port 3000)...
netstat -ano | findstr :3000 | findstr LISTENING >nul
if %errorlevel% neq 0 (
    echo    - Máy chủ chưa chạy. Đang kích hoạt Server hiệu năng cao...
    if exist "server.js" (
        start "IELTS-Mastery-Server" /min cmd /c "node server.js"
    ) else (
        start "IELTS-Mastery-Server" /min cmd /c "npm.cmd run dev"
    )
    
    echo [2/3] Đang đợi máy chủ sẵn sàng kết nối...
    set /a RETRY=0
    :WAIT_SERVER
    timeout /t 1 /nobreak >nul
    netstat -ano | findstr :3000 | findstr LISTENING >nul
    if %errorlevel% neq 0 (
        set /a RETRY+=1
        if %RETRY% leq 25 (
            goto WAIT_SERVER
        ) else (
            echo    [CẢNH BÁO] Máy chủ khởi động lâu hơn dự kiến. Vẫn tiếp tục mở giao diện...
        )
    ) else (
        echo    - Máy chủ đã sẵn sàng hoạt động tại http://localhost:3000!
        timeout /t 1 /nobreak >nul
    )
) else (
    echo    - Máy chủ đã đang chạy sẵn sàng trên cổng 3000!
)

echo.
echo [3/3] Đang mở ứng dụng IELTS Mastery 7.5...
if exist "dist-desktop\win-unpacked\IELTS Mastery 7.5.exe" (
    start "" "dist-desktop\win-unpacked\IELTS Mastery 7.5.exe"
) else (
    start "" npx.cmd electron .
)

echo.
echo ========================================================
echo [THÀNH CÔNG] Giao diện ứng dụng đang hiển thị!
echo ========================================================
timeout /t 3 /nobreak >nul
exit
