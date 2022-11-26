import {
  createSelector,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import sampleFileSystem from "common/fileSystem";
import { MockDirectory, MockFileContent } from "common/types";
import { RootState } from "./store";
import get from "lodash.get";
import { PinnedItemType, pinnedSlice } from "./pinnedSlice";
// Define a type for the slice state
export interface FileSystemState {
  value: MockDirectory;
}

// Define the initial state using that type
const initialState: FileSystemState = {
  value: sampleFileSystem as MockDirectory,
};

export const fileSystemSlice = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {},
  extraReducers: {
    [pinnedSlice.actions.pin.type]: (
      state,
      action: PayloadAction<PinnedItemType>
    ) => {
      try {
        const fileRef = getParentDirectory(
          state.value as MockDirectory,
          action.payload.path
        );

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

const getParentDirectory = (rootFile: MockDirectory, path: string[]) => {
  if (!path.length) return rootFile;
  const deepest = get(rootFile, path.join(".items."), undefined) as
    | MockFileContent
    | undefined;
  if (!deepest) throw new Error("Path was not defined");
  return deepest;
};

const highestChildrenHelper = (
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

  return deepest.items as unknown as MockDirectory;
};

// Action creators are generated for each case reducer function

// Other code such as selectors can use the imported `RootState` type
export const selectHighestChildren = (state: RootState) => {
  const currFile = state.fileSystem.value;
  const path = state.path.value;
  return highestChildrenHelper(currFile, path);
};
export const selectFileSystem = (state: RootState) => state.fileSystem.value;

export default fileSystemSlice.reducer;
