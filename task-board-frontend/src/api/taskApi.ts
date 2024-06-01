// src/api/taskApi.ts
import axios from "axios";
import { Task } from "../types";

const API_URL = "http://localhost:3000";

export const fetchTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const createTask = async (task: Omit<Task, "id">) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error("Error add Task: ", error);
  }
};

export const deleteTask = async (id: number) => {
  const response = await axios.delete(`${API_URL}/tasks/${id}`);
  return response;
};
