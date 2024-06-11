import axios from "axios";
import axiosConfig from "./axios.config";

const productionUrl = "https://api.taskermanager.site/employee/getUserId";
const devUrl = "http://localhost:3005/employee/getUserId";
export default async () => {
  return axios.get(productionUrl, axiosConfig);
};
