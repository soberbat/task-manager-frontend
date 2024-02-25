import axios from "axios";
import { UserData } from "./app.types";
import axiosConfig from "./axios.config";

export default async () => {
  const productionUrl = `https://api.taskermanager.site/employee/getData`;
  const devUrl = `http://localhost:3001/employee/getData`;
  try {
    const response = await axios.get(devUrl, axiosConfig);
    return response.data;
  } catch (error) {}
};
