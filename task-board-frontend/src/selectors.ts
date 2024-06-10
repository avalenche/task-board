import { createSelector } from "reselect";
import { RootState } from "./store";

const selectTasks = (state: RootState) => state.tasks.tasks;

export const selectIsTasks = (id: number) =>
  createSelector(
    [selectTasks],
    (tasks) => tasks.filter((task) => task.idTaskList === id).length > 0
  );
