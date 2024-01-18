import axios from "axios";
import { TeamMember } from "./app.types";
import axiosConfig from "./axios.config";

const productionUrl = "https://api.taskermanager.online/employee/only-mails";
const devUrl = "http://localhost:3005/employee/only-mails";

export default async () => {
  try {
    const response = await axios.get(productionUrl, axiosConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
};
