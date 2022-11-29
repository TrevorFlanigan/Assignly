import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import fileSystemReducer from "./fileSystemSlice";
import pathReducer from "./pathSlice";
import pinnedReducer from "./pinnedSlice";
import canvasFileSystemReducer from "./canvasFileSystemSlice";
import canvasPathReducer from "./canvasPathSlice";

const store = configureStore({
  reducer: {
    path: pathReducer,
    fileSystem: fileSystemReducer,
    pinned: pinnedReducer,
    canvasFileSystem: canvasFileSystemReducer,
    canvasPath: canvasPathReducer
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
