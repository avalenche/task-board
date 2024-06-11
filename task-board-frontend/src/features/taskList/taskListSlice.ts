// src/features/taskList/taskListSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskListType, TaskListState } from "../../types";
import {
  fetchTaskList,
  createTaskList,
  fetchDeleteTaskList,
  fetchUpdateTaskList,
} from "../../api/taskListApi";

const initialState: TaskListState = {
  taskLists: [],
  getLoading: "idle",
  delLoading: "idle",
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
    await fetchDeleteTaskList(id);
    return id;
  }
);
const updateTaskList = createAsyncThunk<TaskListType, Partial<TaskListType>>(
  "taskList/updateTaskList",
  async (taskList) => {
    const response = await fetchUpdateTaskList(taskList);
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
      state.getLoading = "loading";
    });
    builder.addCase(getTaskList.fulfilled, (state, action) => {
      state.taskLists = action.payload;
      state.getLoading = "succeeded";
    });
    builder.addCase(getTaskList.rejected, (state) => {
      state.getLoading = "failed";
    });

    builder.addCase(addTaskList.fulfilled, (state, action) => {
      state.taskLists.push(action.payload);
      state.addLoading = "succeeded";
    });
    builder.addCase(addTaskList.pending, (state) => {
      state.addLoading = "loading";
    });
    builder.addCase(addTaskList.rejected, (state) => {
      state.addLoading = "failed";
    });

    builder.addCase(deleteTaskList.fulfilled, (state, action) => {
      state.delLoading = "succeeded";
      state.taskLists = state.taskLists.filter(
        (taskList) => taskList.id !== action.payload
      );
      state.deleteError = null;
    });
    builder.addCase(deleteTaskList.pending, (state) => {
      state.delLoading = "loading";
    });
    builder.addCase(deleteTaskList.rejected, (state, action) => {
      state.delLoading = "failed";
      state.deleteError = action.error.message || "Failed to delete task list";
    });

    builder.addCase(updateTaskList.fulfilled, (state, action) => {
      const index = state.taskLists.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.taskLists[index] = action.payload;
      }
    });
  },
});

export const { actions, reducer } = taskListSlice;

export { getTaskList, addTaskList, deleteTaskList, updateTaskList };

export default taskListSlice.reducer;
