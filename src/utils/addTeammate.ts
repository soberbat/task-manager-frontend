import axios from "axios";
import axiosConfig from "./axios.config";

export default async (userId: number) => {
  const productionUrl = `https://api.taskermanager.online/team/employee/${userId}`;
  const devUrl = `http://localhost:3001/team/employee/${userId}`;
  try {
    const response = await axios.patch(devUrl, {}, axiosConfig);
    console.log("Task created successfully:", response.data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
