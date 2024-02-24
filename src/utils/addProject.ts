import axios from "axios";
import axiosConfig from "./axios.config";

type data = {
  name: string;
  description: string;
};

const devUrl = "http://localhost:3001/project";
const prodUrl = "https://api.taskermanager.online/project";
export default async (projectData: data) => {
  try {
    const response = await axios.post(devUrl, projectData, axiosConfig);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
