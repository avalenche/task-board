import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import taskReducer from "./features/task/taskSlice";
import taskListReducer from "./features/taskList/taskListSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    taskLists: taskListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
