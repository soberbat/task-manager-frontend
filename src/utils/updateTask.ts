import axios from "axios";
import axiosConfig from "./axios.config";

export default async (taskData: {}, taskId: number) => {
  const productionUrl = `https://api.taskermanager.online/tasks/${taskId}`;
  const devUrl = `http://localhost:3001/tasks/${taskId}`;
  try {
    const response = await axios.patch(productionUrl, taskData, axiosConfig);
    console.log("Project deleted successfully:", response.data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
