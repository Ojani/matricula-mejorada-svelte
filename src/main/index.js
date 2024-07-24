import { fileURLToPath } from 'url'
import path, { dirname /*, resolve */ } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain } from 'electron'
import getUserCurriculum from '../lib/httpCurriculumBuilder/importCurriculimFromPortal.cjs'

// setting up variables to know which platform we're running on
// const IS_WINDOWS = process.platform === "win32"
// const IS_LINUX = process.platform === "linux"
const IS_MAC = process.platform === 'darwin'

var mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('importCurriculum', handleImportCurriculum)

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (!IS_MAC) app.quit()
})

// importing curriculum
async function handleImportCurriculum() {
  console.log(0)
  const oldPortalLoginWindow = new BrowserWindow({
    width: 700,
    height: 400,
    resizable: false,
    parent: mainWindow
  })

  // extracting authentication cookies from the window and using them to scrape the
  // user's curriculum from home.uprm.edu
  oldPortalLoginWindow.webContents.on('did-navigate', async (ev, url) => {
    const isLoggedIn = url.includes('home.uprm.edu/home.php')
    if (!isLoggedIn) return

    // closing the window
    oldPortalLoginWindow.close()

    try {
      const cookies = await oldPortalLoginWindow.webContents.session.cookies.get({})
      const curriculum = await getUserCurriculum(cookies)

      // sending curriculum back to the renderer
      mainWindow.webContents.send('recieveCurriculum', curriculum)
    } catch (err) {
      console.log(err)
    }
  })

  oldPortalLoginWindow.loadURL('https://home.uprm.edu/')
}
