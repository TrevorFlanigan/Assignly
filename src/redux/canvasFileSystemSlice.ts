import {
    createSelector,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import sampleFileSystem from "common/canvasFileSystem";
import { MockDirectory, MockFileContent } from "common/types";
import { RootState } from "./store";
import get from "lodash.get";
import openPDF from "@/util/openPDF";

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

export const selectCanvasFileSystem = (state: RootState) => state.canvasFileSystem.value;
export default canvasFileSystemSlice.reducer;