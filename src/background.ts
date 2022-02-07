import { app, protocol, BrowserWindow, Menu, ipcMain, remote } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

import MenuTemplate from "../src/data/GetMenuTemplate";
import path from "path";

let win: BrowserWindow;
let child: BrowserWindow;
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])
//menu.popup(BrowserWindow.fromWebContents(event.sender))


async function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hiddenInset',
    frame: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
    }
  })

  try {
    win.setMenu(Menu.buildFromTemplate(MenuTemplate))
  } catch (error) {
    console.log("erro no menu")
  }

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      if (e instanceof TypeError) {
        console.error('Vue Devtools failed to install:', e.toString())
      }
    }
  }
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

//Action Winodows

ipcMain.on("action-menu", function (event, action): void {
  switch (action) {
    case 'new Windows':
      child = new BrowserWindow({ parent: win });
      child.setMenu(Menu.buildFromTemplate(MenuTemplate))
      child.show();
      break;
    case 'appearance-light':
      win.webContents.executeJavaScript("document.querySelector('html').setAttribute('theme', 'light')")
      break;
    case 'appearance-dark':
      win.webContents.executeJavaScript("document.querySelector('html').setAttribute('theme', 'dark')")
      break;
  }
})

ipcMain.on("action-window", function (event, action): void {
  const currentWindow: any = win || remote.BrowserWindow.getFocusedWindow()
  switch (action) {
    case 'minimize':
      currentWindow.minimize();
      break;
    case 'maximize':
      if (!currentWindow.isMaximized()) {
        currentWindow.maximize();
      } else {
        currentWindow.unmaximize();
      }
      break;
    case 'close':
      currentWindow.close();
      break;
  }
})