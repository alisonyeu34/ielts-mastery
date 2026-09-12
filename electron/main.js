const { app, BrowserWindow, Menu, globalShortcut, shell, ipcMain } = require('electron');
const path = require('path');
const http = require('http');

let mainWindow = null;
const isDev = process.env.NODE_ENV !== 'production' && !app.isPackaged;
const PORT = process.env.PORT || 3000;
const SERVER_URL = `http://localhost:${PORT}`;

// Function to check if the Next.js server is responsive
function checkServerReady(url, callback) {
  const req = http.get(url, (res) => {
    if (res.statusCode >= 200 && res.statusCode < 400) {
      callback(true);
    } else {
      callback(false);
    }
  });

  req.on('error', () => {
    callback(false);
  });

  req.setTimeout(1500, () => {
    req.destroy();
    callback(false);
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: 'IELTS Mastery 7.5 - Nền Tảng Luyện Thi Chuyên Sâu',
    backgroundColor: '#090d16',
    show: false,
    icon: path.join(__dirname, '../public/icons/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      spellcheck: true
    }
  });

  // Custom Desktop Menu
  const template = [
    {
      label: 'Hệ Thống',
      submenu: [
        {
          label: 'Trang Chủ Dashboard',
          accelerator: 'CmdOrCtrl+H',
          click: () => {
            if (mainWindow) mainWindow.loadURL(SERVER_URL);
          }
        },
        {
          label: 'Làm Mới (Reload)',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            if (mainWindow) mainWindow.reload();
          }
        },
        { type: 'separator' },
        {
          label: 'Thoát Ứng Dụng',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Phòng Thi',
      submenu: [
        {
          label: 'Chế Độ Toàn Màn Hình (Exam Fullscreen)',
          accelerator: 'F11',
          click: () => {
            if (mainWindow) {
              const isFullScreen = mainWindow.isFullScreen();
              mainWindow.setFullScreen(!isFullScreen);
            }
          }
        },
        {
          label: 'Kiểm Định Vượt Vũ Môn (Readiness Audit)',
          click: () => {
            if (mainWindow) mainWindow.loadURL(`${SERVER_URL}/readiness-audit`);
          }
        },
        {
          label: 'Nghi Thức Ngày Thứ 180 (Exam Day Protocol)',
          click: () => {
            if (mainWindow) mainWindow.loadURL(`${SERVER_URL}/exam-day-protocol`);
          }
        }
      ]
    },
    {
      label: 'Giao Diện',
      submenu: [
        { role: 'zoomIn', label: 'Phóng To' },
        { role: 'zoomOut', label: 'Thu Nhỏ' },
        { role: 'resetZoom', label: 'Cỡ Chữ Chuẩn' },
        { type: 'separator' },
        { role: 'toggledevtools', label: 'Công Cụ Nhà Phát Triển (DevTools)' }
      ]
    },
    {
      label: 'Trợ Giúp',
      submenu: [
        {
          label: 'Tài Liệu IELTS 7.5',
          click: () => {
            if (mainWindow) mainWindow.loadURL(`${SERVER_URL}/roadmap`);
          }
        },
        {
          label: 'Giới Thiệu Ứng Dụng',
          click: () => {
            shell.openExternal('https://github.com');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Show window once ready to prevent white flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle external links safely in system default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      if (!url.includes(`localhost:${PORT}`)) {
        shell.openExternal(url);
        return { action: 'deny' };
      }
    }
    return { action: 'allow' };
  });

  // Auto-retry on failed navigation instead of showing Chrome error page
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    if (validatedURL && validatedURL.includes(`localhost:${PORT}`)) {
      setTimeout(() => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          checkServerReady(SERVER_URL, (ready) => {
            if (ready) {
              mainWindow.loadURL(SERVER_URL);
            }
          });
        }
      }, 1500);
    }
  });

  // Loading strategy: poll until Next.js is ready
  let attempts = 0;
  const maxAttempts = 30;

  function tryLoad() {
    checkServerReady(SERVER_URL, (isReady) => {
      if (isReady) {
        mainWindow.loadURL(SERVER_URL);
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(tryLoad, 1000);
      } else {
        // Fallback display if server failed to start
        mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>IELTS Mastery Desktop</title>
              <style>
                body { background: #090d16; color: #f8fafc; font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                h1 { color: #818cf8; font-size: 24px; margin-bottom: 8px; }
                p { color: #94a3b8; font-size: 14px; max-width: 480px; text-align: center; }
                button { background: #4f46e5; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; margin-top: 16px; }
                button:hover { background: #4338ca; }
              </style>
            </head>
            <body>
              <h1>Đang khởi động IELTS Mastery...</h1>
              <p>Hệ thống máy chủ cục bộ đang nạp dữ liệu. Vui lòng bấm Thử Lại hoặc đợi trong giây lát.</p>
              <button onclick="location.reload()">Thử Lại (Connect)</button>
            </body>
          </html>
        `)}`);
      }
    });
  }

  tryLoad();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Ensure single instance lock
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
      }
    });
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
