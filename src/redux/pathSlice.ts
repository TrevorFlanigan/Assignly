import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Define a type for the slice state
export interface PathState {
  value: string[];
}

// Define the initial state using that type
const initialState: PathState = {
  value: ["CPEN 441"],
};

export const pathSlice = createSlice({
  name: "path",
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
    popTo: (state, action: PayloadAction<number>) => {
      state.value = state.value.slice(0, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { push, pop, popTo, setPath } = pathSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPath = (state: RootState) => state.path.value;

export default pathSlice.reducer;
