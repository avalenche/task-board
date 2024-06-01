import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/task/taskSlice";
import taskListReducer from "./features/taskList/taskListSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    taskLists: taskListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
