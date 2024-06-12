import axios from "axios";
import axiosConfig from "./axios.config";

export default async (userId: number) => {
  const productionUrl = `https://backend.taskermanager.site/team/employee/${userId}`;
  const devUrl = `http://localhost:3001/team/employee/${userId}`;

  try {
    const response = await axios.patch(productionUrl, {}, axiosConfig);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
