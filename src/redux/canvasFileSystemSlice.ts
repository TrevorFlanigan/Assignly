import openPDF from "@/util/openPDF";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import sampleFileSystem from "common/canvasFileSystem";
import { FileType, MockDirectory, MockFileContent } from "common/types";
import get from "lodash.get";
import { fileSystemSlice } from "./fileSystemSlice";
import { RootState } from "./store";

// Define a type for the slice state
export interface CanvasFileSystemState {
  value: MockDirectory;
  toCopy: string[] | undefined;
}

// Define the initial state using that type
const initialState: CanvasFileSystemState = {
  value: sampleFileSystem as MockDirectory,
  toCopy: undefined,
};

export const canvasFileSystemSlice = createSlice({
  name: "canvasFileSystem",
  initialState,
  reducers: {
    startCopyTo: (state, action: PayloadAction<string[]>) => {
      state.toCopy = action.payload;
    },
  },
  extraReducers: {
    [fileSystemSlice.actions.finishCopyTo.type]: (state) => {
      state.toCopy = undefined;
    },
  },
});

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

export const selectCurrentDirectory = (state: RootState) => {
  const curPath: string[] = state.canvasPath.value;
  const fs = state.canvasFileSystem.value;
  if (curPath.length == 0) return fs;

  const accessString: string = curPath.join(".items.");
  const curDirectory = get(fs, accessString);
  if (!curDirectory) {
    throw new Error(`Bad path: ${curPath}`);
  }

  if (!curDirectory.items) {
    if (curDirectory.type == "PDF" && curDirectory.leaf) {
      openPDF(curDirectory.leaf);
      return curDirectory.leaf;
    }

    return {} as MockDirectory;
  }

  return curDirectory.items as MockDirectory;
};

export const selectToCopy = (state: RootState) => state.canvasFileSystem.toCopy;
export const selectToCopyFile = (state: RootState) => {
  if (!state.canvasFileSystem.toCopy) {
    return undefined;
  }

  return getParentDirectory(
    state.canvasFileSystem.value,
    state.canvasFileSystem.toCopy
  );
};
export const selectCanvasFileSystem = (state: RootState) =>
  state.canvasFileSystem.value;

export const { startCopyTo } = canvasFileSystemSlice.actions;
export default canvasFileSystemSlice.reducer;
