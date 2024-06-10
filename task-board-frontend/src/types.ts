export interface Task {
  id: number;
  idTaskList: number;
  name: string;
  description: string;
  dueDate: string;
  priority: string;
}

export interface TaskState {
  tasks: Task[];
  loading: "idle" | "loading" | "succeeded" | "failed";
  deleting: "idle" | "loading" | "succeeded" | "failed";
  addLoading: "idle" | "loading" | "succeeded" | "failed";
  deleteError: string | null;
}

export interface TaskListType {
  id: number;
  name: string;
}

export interface TaskListState {
  taskLists: TaskListType[];
  getLoading: "idle" | "loading" | "succeeded" | "failed";
  delLoading: "idle" | "loading" | "succeeded" | "failed";
  addLoading: "idle" | "loading" | "succeeded" | "failed";
  deleteError: string | null;
}
