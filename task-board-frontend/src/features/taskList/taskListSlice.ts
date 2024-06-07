// src/features/taskList/taskListSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskListType, TaskListState } from "../../types";
import {
  fetchTaskList,
  createTaskList,
  fetchDeleteTaskLIst,
} from "../../api/taskListApi";

const initialState: TaskListState = {
  taskLists: [],
  loading: "idle",
  deleting: "idle",
  addLoading: "idle",
  deleteError: null,
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

const deleteTaskList = createAsyncThunk<number, number>(
  "taskList/deleteTaskList",
  async (id: number) => {
    await fetchDeleteTaskLIst(id);
    return id;
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
    builder.addCase(deleteTaskList.fulfilled, (state, action) => {
      state.deleting = "succeeded";
      state.taskLists = state.taskLists.filter(
        (taskList) => taskList.id !== action.payload
      );
    });
  },
});

export const { actions, reducer } = taskListSlice;

export { getTaskList, addTaskList, deleteTaskList };

export default taskListSlice.reducer;
