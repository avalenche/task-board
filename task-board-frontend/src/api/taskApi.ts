// src/api/taskApi.ts
import axios from "axios";
import { Task } from "../types";

const API_URL = "http://localhost:3000/tasks";

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchCreateTask = async (task: Omit<Task, "id">) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    console.error("Error add Task: ", error);
    throw error;
  }
};

export const fetchDeleteTask = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error("Error delete Task:", error);
    throw error;
  }
};

export const fetchUpdateTask = async (task: Partial<Task>) => {
  try {
    const response = await axios.patch(`${API_URL}/${task.id}`, task);
    return response.data;
  } catch (error) {
    console.error("Error update Task: ", error);
    throw error;
  }
};
