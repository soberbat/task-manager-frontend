import axios from "axios";
import axiosConfig from "./axios.config";

export type TaskData = {
  [key: string | number]: string | number | boolean;
};

export default async (taskData: TaskData, taskId: number) => {
  const productionUrl = `https://api.taskermanager.site/tasks/${taskId}`;
  const devUrl = `http://localhost:3001/tasks/${taskId}`;
  try {
    const response = await axios.patch(productionUrl, taskData, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
