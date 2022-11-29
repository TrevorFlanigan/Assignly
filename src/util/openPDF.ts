import { ipcRenderer } from "electron";

const openPDF = (name: string) => {
  ipcRenderer.send("open-pdf", {
    name,
  });
};

export default openPDF;
