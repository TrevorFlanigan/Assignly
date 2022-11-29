import {
  newFolder,
  selectFileSystem,
  startChangeType,
  startMoveTo,
  startRename,
} from "@/redux/fileSystemSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { FileType, MenuOptions } from "common/types";
import { ipcRenderer, IpcRendererEvent } from "electron";
import { useEffect } from "react";

const useContextEvents = () => {
  const fileSystem = useAppSelector(selectFileSystem);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handler = (
      e: IpcRendererEvent,
      { option, path }: { option: MenuOptions; path: string[] }
    ) => {
      switch (option) {
        case MenuOptions.NEW_FOLDER:
          dispatch(newFolder({ path, type: FileType.FOLDER }));
          break;
        case MenuOptions.NEW_PROJECT:
          dispatch(newFolder({ path, type: FileType.PROJECT }));
          break;
        case MenuOptions.NEW_COURSE:
          dispatch(newFolder({ path, type: FileType.COURSE }));
          break;
        case MenuOptions.NEW_NOTES:
          dispatch(newFolder({ path, type: FileType.NOTES }));
          break;
        case MenuOptions.RENAME:
          dispatch(startRename(path));
          break;
        case MenuOptions.CHANGE_TYPE:
          dispatch(startChangeType(path));
          break;
        case MenuOptions.MOVE_TO:
          dispatch(startMoveTo(path));
          break;
        default:
          break;
      }
    };
    ipcRenderer.on("context-menu-command", handler);

    return () => {
      ipcRenderer.removeListener("context-menu-command", handler);
    };
  }, []);
};

export default useContextEvents;
