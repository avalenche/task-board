// src/api/taskListApi.ts
import axios from "axios";
import { TaskListType } from "../types";

const API_URL = "http://localhost:3000/task-list";

export const fetchTaskList = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTaskList = async (taskList: Omit<TaskListType, "id">) => {
  try {
    const response = await axios.post(API_URL, taskList);
    return response.data;
  } catch (error) {
    console.error("Error add Task-List: ", error);
  }
};

export const fetchDeleteTaskList = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response;
};

export const fetchUpdateTaskList = async (taskList: Partial<TaskListType>) => {
  try {
    const response = await axios.patch(`${API_URL}/${taskList.id}`, taskList);
    return response.data;
  } catch (error) {
    console.error("Error update Task: ", error);
    throw error;
  }
};
