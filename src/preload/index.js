import { contextBridge, ipcRenderer } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    // contextBridge.exposeInMainWorld('electron', electronAPI)
    // contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electronAPI', {
      importCurriculum: () => ipcRenderer.send('importCurriculum'),
      onRecieveCurriculum: (cb) => ipcRenderer.on('recieveCurriculum', (_ev, data) => cb(data)),
      getSections: (courseCode) => ipcRenderer.invoke('getSections', courseCode)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // window.electron = electronAPI
  window.api = api
}
