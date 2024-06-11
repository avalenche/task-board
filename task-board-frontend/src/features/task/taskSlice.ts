import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskState, Task } from "../../types";
import {
  fetchDeleteTask,
  fetchTasks,
  fetchCreateTask,
  fetchUpdateTask,
} from "../../api/taskApi";

const initialState: TaskState = {
  tasks: [],
  loading: "idle",
  deleting: "idle",
  addLoading: "idle",
  deleteError: null,
};
const getTasks = createAsyncThunk<Task[]>("tasks/getTasks", fetchTasks);

const deleteTask = createAsyncThunk<number, number>(
  "tasks/deleteTask",
  async (id: number) => {
    await fetchDeleteTask(id);
    return id;
  }
);

const addTask = createAsyncThunk<Task, Omit<Task, "id">>(
  "tasks/addTask",
  async (newTask) => {
    const response = await fetchCreateTask(newTask);
    return response;
  }
);

const updateTask = createAsyncThunk<Task, Partial<Task>>(
  "tasks/updateTask",
  async (task) => {
    const response = await fetchUpdateTask(task);
    return response;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    // deleteTask(state, action: PayloadAction<number>) {
    //   state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    // },
    // Add other reducers for editing, removing, and moving tasks
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getTasks.rejected, (state) => {
      state.loading = "failed";
    });

    builder.addCase(deleteTask.pending, (state) => {
      state.deleting = "loading";
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.deleting = "succeeded";
      state.deleteError = null;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.deleting = "failed";
      state.deleteError = action.error.message || "Failed to delete task";
    });

    builder.addCase(addTask.pending, (state) => {
      state.addLoading = "loading";
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
      state.addLoading = "succeeded";
    });
    builder.addCase(addTask.rejected, (state) => {
      state.addLoading = "failed";
    });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    });
  },
});

export const { actions, reducer } = taskSlice;
export { getTasks, deleteTask, addTask, updateTask };
export default taskSlice.reducer;
