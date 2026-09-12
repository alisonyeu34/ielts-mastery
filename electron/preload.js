const { contextBridge, ipcRenderer } = require('electron');

// Expose safe desktop system APIs to window.electronAPI
contextBridge.exposeInMainWorld('electronAPI', {
  isDesktop: true,
  platform: process.platform,
  version: process.versions.electron,
  nodeVersion: process.versions.node,
  minimize: () => ipcRenderer.send('window:minimize'),
  maximize: () => ipcRenderer.send('window:maximize'),
  close: () => ipcRenderer.send('window:close')
});
