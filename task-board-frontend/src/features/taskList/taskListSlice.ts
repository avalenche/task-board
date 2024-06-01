// src/features/taskList/taskListSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskListType, TaskListState } from "../../types";
import { fetchTaskList, createTaskList } from "../../api/taskListApi";

const initialState: TaskListState = {
  taskLists: [],
  loading: "idle",
};

const getTaskList = createAsyncThunk<TaskListType[]>(
  "taskList/getTaskList",
  fetchTaskList
);

const addTaskList = createAsyncThunk<TaskListType, Omit<TaskListType, "id">>(
  "taskList/addTaskList",
  async (newTaskList) => {
    const response = await createTaskList(newTaskList);
    return response;
  }
);

const taskListSlice = createSlice({
  name: "taskLists",
  initialState,
  reducers: {
    setTaskLists(state, action: PayloadAction<TaskListType[]>) {
      state.taskLists = action.payload;
    },
    addTaskList(state, action: PayloadAction<TaskListType>) {
      state.taskLists.push(action.payload);
    },
    updateTaskList(state, action: PayloadAction<TaskListType>) {
      const index = state.taskLists.findIndex(
        (taskList) => taskList.id === action.payload.id
      );
      if (index !== -1) {
        state.taskLists[index] = action.payload;
      }
    },
    deleteTaskList(state, action: PayloadAction<number>) {
      state.taskLists = state.taskLists.filter(
        (taskList) => taskList.id !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(getTaskList.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(getTaskList.fulfilled, (state, action) => {
      state.taskLists = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getTaskList.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(addTaskList.fulfilled, (state, action) => {
      state.taskLists.push(action.payload);
      // state.loading = "succeeded";
    });
  },
});

export const { actions, reducer } = taskListSlice;

export { getTaskList, addTaskList };

export default taskListSlice.reducer;
