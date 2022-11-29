import { BrowserWindow, shell } from "electron";
import { join } from "path";

export const openPDF = (win: BrowserWindow, pdfName: string) => {
  const filePath = join(__dirname, `../../common/pdfs/${pdfName}`);
  const newWin = new BrowserWindow({
    y: 0,
    x: 0,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  newWin.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
  // if (process.env.VITE_DEV_SERVER_URL) {
  newWin.loadURL(`file://${filePath}`);
  // } else {
  // console.log("we need to be in dev mode lol");
  // }
};
