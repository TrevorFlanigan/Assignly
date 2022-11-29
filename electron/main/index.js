process.env.DIST_ELECTRON = join(__dirname, "../..");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = app.isPackaged
    ? process.env.DIST
    : join(process.env.DIST_ELECTRON, "../public");
import { app, BrowserWindow, shell, ipcMain, MenuItem, } from "electron";
import { Menu } from "electron/main";
import { release } from "os";
import { join } from "path";
import { openPDF } from "./openPDF";
// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1"))
    app.disableHardwareAcceleration();
// Set application name for Windows 10+ notifications
if (process.platform === "win32")
    app.setAppUserModelId(app.getName());
if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}
// let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");
let win;
async function createWindow() {
    win = new BrowserWindow({
        title: "Main window",
        icon: join(process.env.PUBLIC, "favicon.svg"),
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    if (process.env.VITE_DEV_SERVER_URL) {
        // electron-vite-vue#298
        win.loadURL(url);
        // Open devTool if the app is not packaged
        win.webContents.openDevTools();
    }
    else {
        win.loadFile(indexHtml);
    }
    // Test actively push message to the Electron-Renderer
    win.webContents.on("did-finish-load", () => {
        win?.webContents.send("main-process-message", new Date().toLocaleString());
    });
    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith("https:"))
            shell.openExternal(url);
        // else if (url === "about:blank") {
        //   return {
        //     action: "allow",
        //     overrideBrowserWindowOptions: {
        //       frame: false,
        //       fullscreenable: false,
        //       backgroundColor: "black",
        //       webPreferences: {
        //         // preload: "my-child-window-preload-script.js",
        //       },
        //     },
        //   };
        // }
        return { action: "deny" };
    });
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
    win = null;
    if (process.platform !== "darwin")
        app.quit();
});
app.on("second-instance", () => {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized())
            win.restore();
        win.focus();
    }
});
app.on("activate", () => {
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
        allWindows[0].focus();
    }
    else {
        createWindow();
    }
});
// new window example arg: new windows url
ipcMain.handle("open-win", (event, arg) => {
    const childWindow = new BrowserWindow({
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    if (process.env.VITE_DEV_SERVER_URL) {
        childWindow.loadURL(`${url}#${arg}`);
    }
    else {
        childWindow.loadFile(indexHtml, { hash: arg });
    }
});
const getMenuOption = (option, path, event, extra) => {
    let submenu;
    if (extra && extra[option]) {
        const submenuLabels = extra[option].submenuLabels;
        console.log(submenuLabels);
    }
    return new MenuItem({
        label: option,
        submenu,
        click: () => {
            event.sender.send("context-menu-command", { option, path });
        },
    });
};
ipcMain.on("show-context-menu", (event, args) => {
    const { menuOptions, path, extra } = args;
    const template = [];
    menuOptions.forEach((option) => {
        template.push(getMenuOption(option, path, event, extra));
    });
    const menu = Menu.buildFromTemplate(template);
    menu.popup(BrowserWindow.fromWebContents(event.sender));
});
ipcMain.on("open-pdf", (event, args) => {
    const { name } = args;
    if (!win) {
        return;
    }
    openPDF(win, name);
});
