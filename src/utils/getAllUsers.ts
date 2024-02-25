import axios from "axios";
import { TeamMember } from "./app.types";
import axiosConfig from "./axios.config";

const productionUrl =
  "https://api.taskermanager.site/employee/get-all-only-mails";
const devUrl = "http://localhost:3001/employee/get-all-only-mails";

export default async () => {
  try {
    const response = await axios.get(productionUrl, axiosConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
};
