import axios from "axios";
import axiosConfig from "./axios.config";

type data = {
  name: string;
  description: string;
};

const devUrl = "http://localhost:3001/project";
const prodUrl = "https://api.taskermanager.site/project";
export default async (projectData: data) => {
  try {
    const response = await axios.post(prodUrl, projectData, axiosConfig);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
