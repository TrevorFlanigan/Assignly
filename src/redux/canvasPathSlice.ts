import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CanvasPathState {
  value: string[];
}

const initialState: CanvasPathState = {
  value: [],
};

export const canvasPathSlice = createSlice({
  name: "canvasPath",
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    },
    push: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
    pop: (state) => {
      state.value.pop();
    },
    popToIndex: (state, action: PayloadAction<number>) => {
      state.value = state.value.slice(0, action.payload);
    },
  },
});

export const { push, pop, popToIndex, setPath } = canvasPathSlice.actions;
export const selectPath = (state: RootState) => state.canvasPath.value;
export default canvasPathSlice.reducer;
