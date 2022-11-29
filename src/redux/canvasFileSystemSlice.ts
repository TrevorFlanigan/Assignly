import {
    createSelector,
    createSlice,
    current,
    PayloadAction,
} from "@reduxjs/toolkit";
import sampleFileSystem from "common/canvasFileSystem";
import { MockDirectory, MockFileContent } from "common/types";
import { RootState } from "./store";
import get from "lodash.get";

// Define a type for the slice state
export interface CanvasFileSystemState {
    value: MockDirectory;
}

// Define the initial state using that type
const initialState: CanvasFileSystemState = {
    value: sampleFileSystem as MockDirectory,
};

export const canvasFileSystemSlice = createSlice({
    name: "canvasFileSystem",
    initialState,
    reducers: {},
    extraReducers: {}
});


export const selectCurrentDirectory = (state: RootState) => {
    const curPath: string[] = state.canvasPath.value;
    const fs = state.canvasFileSystem.value;
    if (curPath.length == 0) return fs;

    const accessString: string = curPath.join(".items.");
    console.log(accessString);
    return get(fs, accessString).items as MockDirectory;
};
export const selectCanvasFileSystem = (state: RootState) => state.canvasFileSystem.value;
export default canvasFileSystemSlice.reducer;