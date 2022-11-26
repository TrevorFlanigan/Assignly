import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileType } from "common/types";
import { RootState } from "./store";

export type PinnedItemType = {
  path: string[];
  name: string;
  type: FileType;
};

// Define a type for the slice state
export type PinnedState = {
  [name: string]: PinnedItemType;
};

// Define the initial state using that type
const initialState: PinnedState = {
  // "CPEN 441": ["CPEN 441"]
};

export const pinnedSlice = createSlice({
  name: "pinned",
  initialState,
  reducers: {
    pin: (state, action: PayloadAction<PinnedItemType>) => {
      const key = action.payload.path.join("/");
      state[key] = action.payload;
    },
    unpin: (state, action: PayloadAction<PinnedItemType>) => {
      const key = action.payload.path.join("/");
      delete state[key];
    },
  },
});

// Action creators are generated for each case reducer function
export const { pin, unpin } = pinnedSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPinned = (state: RootState) => state.pinned;

export default pinnedSlice.reducer;
