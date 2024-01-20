import axios from "axios";
import axiosConfig from "./axios.config";

type data = {
  name: string;
  description: string;
};
export default async (projectData: data) => {
  try {
    const response = await axios.post(
      // "http://localhost:3001/project",
      "https://api.taskermanager.online/project",
      projectData,
      axiosConfig
    );
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
