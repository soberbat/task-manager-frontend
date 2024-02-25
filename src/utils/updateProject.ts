import axios from "axios";
import axiosConfig from "./axios.config";

type data = {
  name?: string;
  description?: string | null | undefined;
  employeeId?: number;
};

export default async (projectId: number, updatedData: data) => {
  const productionUrl = `https://api.taskermanager.site/project/${projectId}`;
  const devUrl = `http://localhost:3001/project/${projectId}`;
  try {
    const response = await axios.patch(devUrl, updatedData, axiosConfig);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
