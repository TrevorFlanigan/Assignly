import {
  createSelector,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import sampleFileSystem from "common/fileSystem";
import { FileType, MockDirectory, MockFileContent } from "common/types";
import { RootState } from "./store";
import get from "lodash.get";
import { PinnedItemType, pinnedSlice } from "./pinnedSlice";
import { showNotification } from "@mantine/notifications";
import { IconStatusChange, IconX } from "@tabler/icons";
import toTitleCase from "@/util/toTitleCase";
// Define a type for the slice state
export interface FileSystemState {
  value: MockDirectory;
  toRename: string[] | undefined;
  toChangeType: string[] | undefined;
  toMove: string[] | undefined;
}

// Define the initial state using that type
const initialState: FileSystemState = {
  value: sampleFileSystem as MockDirectory,
  toRename: undefined,
  toChangeType: undefined,
  toMove: undefined,
};

const makeNewFolder = (name: string, type: FileType): MockFileContent => {
  return {
    id: name,
    items: {},
    type: type,
  } as MockFileContent;
};

export const fileSystemSlice = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {
    newFolder: (state, actions: PayloadAction<NewThingEvent>) => {
      // Insane way of making a new folder
      const { path, type } = actions.payload;
      const parent = getParentDirectory(state.value, path);
      if (!parent.items) {
        parent.items = {};
      }
      let suffix = "";
      let i = 1;
      while (parent.items[`New ${toTitleCase(type)}${suffix}`] !== undefined) {
        suffix = " " + i;
        i += 1;
      }
      const newFolderName = `New ${toTitleCase(type)}${suffix}`;
      parent.items[newFolderName] = makeNewFolder(newFolderName, type);
    },
    startRename: (state, actions: PayloadAction<string[]>) => {
      state.toRename = actions.payload;
    },
    finishRename: (state, actions: PayloadAction<FinishRenameEvent>) => {
      const { newName, path, name } = actions.payload;
      if (newName === name) {
        state.toRename = undefined;
        return;
      }

      const parent = getParentDirectory(state.value, path);
      if (parent.items[newName]) {
        showNotification({
          id: "rename-error",
          title: "Cannot rename your file",
          message: "A file with that name already exists",
          autoClose: 2000,
          icon: <IconX />,
          color: "red",
        });
        return;
      }

      const old = Object.assign(parent.items[name], {});
      old.id = newName;
      delete parent.items[name];
      parent.items[newName] = old;
      state.toRename = undefined;
    },
    startChangeType: (state, actions: PayloadAction<string[]>) => {
      state.toChangeType = actions.payload;
    },
    finishChangeType: (state, actions: PayloadAction<ChangeTypeAction>) => {
      const { path, type } = actions.payload;
      const parent = getParentDirectory(state.value, path);
      parent.type = type as FileType;
      state.toChangeType = undefined;
    },
    startMoveTo: (state, actions: PayloadAction<string[]>) => {
      state.toMove = actions.payload;
    },
    finishMoveTo: (state, actions: PayloadAction<FinishMoveToEvent>) => {
      const { srcPath, destPath } = actions.payload;
      if (srcPath.join("/") === destPath.join("/")) {
        state.toMove = undefined;
        showNotification({
          id: "move-file",
          title: "Move File Cancelled",
          message: "File was not moved anywhere",
          autoClose: 2000,
          icon: <IconX />,
          color: "gray",
        });
        return;
      }
      const currFileName = srcPath[srcPath.length - 1];
      const srcParent = getParentDirectory(state.value, srcPath.slice(0, -1));
      const destParent = getParentDirectory(state.value, destPath);
      if (!destParent.items) {
        destParent.items = {};
      }
      let suffix = "";
      let i = 1;
      while (destParent.items[`${currFileName}${suffix}`] !== undefined) {
        suffix = " " + i;
        i += 1;
      }
      const old = srcParent.items[currFileName];
      delete srcParent.items[currFileName];
      const newFileName = `${currFileName}${suffix}`;
      destParent.items[newFileName] = old;

      showNotification({
        id: "move-file",
        title: "File Moved",
        message: `${currFileName} was moved to ${
          destPath.length ? destPath : "Home"
        }/${newFileName}`,
        autoClose: 2000,
        icon: <IconStatusChange />,
        color: "green",
      });
      state.toMove = undefined;
    },
    finishCopyTo: (state, action: PayloadAction<FinishCopyToEvent>) => {
      const { cancel, file, path, name } = action.payload;
      if (cancel || !file) {
        showNotification({
          id: "copy-file",
          title: "Copy File Cancelled",
          message: "File was not copied",
          autoClose: 2000,
          icon: <IconX />,
          color: "gray",
        });
        return;
      }
      const currFileName = name;

      const dest = getParentDirectory(state.value, path);
      if (!dest.items) {
        dest.items = {};
      }
      let suffix = "";
      let i = 1;
      while (dest.items[`${currFileName}${suffix}`] !== undefined) {
        suffix = " " + i;
        i += 1;
      }
      const old = Object.assign(file, {});
      const newFileName = `${currFileName}${suffix}`;

      dest.items[newFileName] = old;
      // dest.items[newFileName].id = newFileName;
    },
  },
  extraReducers: {
    [pinnedSlice.actions.pin.type]: (
      state,
      action: PayloadAction<PinnedItemType>
    ) => {
      try {
        const fileRef = getParentDirectory(state.value, action.payload.path);

        fileRef.pinned = true;
      } catch (e) {
        console.error(e);
      }
    },
    [pinnedSlice.actions.unpin.type]: (
      state,
      action: PayloadAction<PinnedItemType>
    ) => {
      try {
        const fileRef = getParentDirectory(
          state.value as MockDirectory,
          action.payload.path
        );

        fileRef.pinned = false;
      } catch (e) {
        console.error(e);
      }
    },
  },
});

export type FinishCopyToEvent = {
  cancel?: boolean;
  name: string;
  file: MockFileContent | undefined;
  path: string[];
};

export type NewThingEvent = {
  path: string[];
  type: FileType;
};

export type FinishMoveToEvent = {
  srcPath: string[];
  destPath: string[];
};

export type FinishRenameEvent = {
  path: string[];
  newName: string;
  name: string;
};

export type ChangeTypeAction = {
  path: string[];
  type: string;
};

const getParentDirectory = (rootFile: MockDirectory, path: string[]) => {
  if (!path.length)
    return {
      items: rootFile,
      id: "root",
      type: FileType.FOLDER,
    } as MockFileContent;
  const deepest = get(rootFile, path.join(".items."), undefined) as
    | MockFileContent
    | undefined;
  if (!deepest) throw new Error("Path was not defined");
  return deepest;
};

export const highestChildrenHelper = (
  rootFile: MockDirectory,
  path: string[]
): MockDirectory => {
  if (!path.length) return rootFile;
  const deepest = getParentDirectory(rootFile, path);
  if (!deepest.items) {
    // Path is a leaf node
    return {} as MockDirectory;
    // This should trigger the UI to show an assignment view or something
  }

  return deepest.items;
};

// Action creators are generated for each case reducer function

// Other code such as selectors can use the imported `RootState` type
export const selectHighestChildren = (state: RootState) => {
  const currFile = state.fileSystem.value;
  const path = state.path.value;
  return highestChildrenHelper(currFile, path);
};
export const selectFileSystem = (state: RootState) => state.fileSystem.value;
export const selectToRename = (state: RootState) => state.fileSystem.toRename;
export const selectToMove = (state: RootState) => state.fileSystem.toMove;
export const selectToChangeType = (state: RootState) =>
  state.fileSystem.toChangeType;

export const selectMe = (state: RootState) => {
  const currFile = state.fileSystem.value;
  const path = state.path.value;
  return getParentDirectory(currFile, path);
};
export const {
  newFolder,
  startRename,
  finishRename,
  startChangeType,
  finishChangeType,
  startMoveTo,
  finishMoveTo,
  finishCopyTo,
} = fileSystemSlice.actions;
export default fileSystemSlice.reducer;
