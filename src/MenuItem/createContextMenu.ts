import { MenuOptions } from "common/types";
import { ipcRenderer } from "electron";

const createContextMenu = (
  options: MenuOptions[],
  path: string[],
  extra?: any
) => {
  ipcRenderer.send("show-context-menu", {
    menuOptions: options,
    path,
    extra,
  });
};

export default createContextMenu;
