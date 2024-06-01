import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskState, Task } from "../../types";
import { fetchTasks } from "../../api/taskApi";

const initialState: TaskState = {
  tasks: [],
  loading: "idle",
};
const getTasks = createAsyncThunk<Task[]>("tasks/getTasks", fetchTasks);

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
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
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
  },
});

export const { actions, reducer } = taskSlice;
export { getTasks };
export default taskSlice.reducer;
