import { createSlice } from "@reduxjs/toolkit";
import sampleFileSystem from "common/fileSystem";
import { MockFile } from "common/types";
import { RootState } from "./store";
import get from "lodash.get";
// Define a type for the slice state
export interface FileSystemState {
  value: MockFile;
}

// Define the initial state using that type
const initialState: FileSystemState = {
  value: sampleFileSystem as MockFile,
};

export const fileSystemSlice = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {},
});

const highestChildrenHelper = (
  rootFile: MockFile,
  path: string[]
): MockFile => {
  if (!path.length) return rootFile;
  const deepest = get(rootFile, path.join(".items."), undefined) as
    | MockFile
    | undefined;
  if (!deepest) {
    // Path does not exist
    throw new Error("Path does not exist");
  }
  if (!deepest.items) {
    // Path is a leaf node
    return {} as MockFile;
  }

  return deepest.items as unknown as MockFile;
  // return get(currFile, path.join(".items.") + ".items", currFile) as MockFile;
};
// Action creators are generated for each case reducer function
// export const { push, pop, popTo } = pathSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectHighestChildren = (state: RootState) => {
  const currFile = state.fileSystem.value;
  const path = state.path.value;
  return highestChildrenHelper(currFile, path);
};
export const selectFileSystem = (state: RootState) => state.fileSystem.value;

export default fileSystemSlice.reducer;
