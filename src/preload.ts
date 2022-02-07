import { contextBridge, ipcRenderer } from 'electron';
import MenuTemplate from "../src/data/GetMenuTemplate";

contextBridge.exposeInMainWorld(
  'remote',
  {
    sendMessage: () => console.log("remote sendMessage"),
    getMenu: () => MenuTemplate,
    minimize: () => ipcRenderer.send("action-window", "minimize"),
    maximize: () => ipcRenderer.send("action-window", "maximize"),
    close: () => ipcRenderer.send("action-window", "close")
  }
)