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
}

export interface TaskListType {
  id: number;
  name: string;
}

export interface TaskListState {
  taskLists: TaskListType[];
  loading: "idle" | "loading" | "succeeded" | "failed";
}
