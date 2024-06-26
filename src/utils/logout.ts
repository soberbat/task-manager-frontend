import axios from "axios";
import axiosConfig from "./axios.config";

const prodEndpoint = "https://backend.taskermanager.site/auth/logout";
const devEndpoint = "http://localhost:3001/auth/logout";

export default async function Logout() {
  return axios.post(prodEndpoint, {}, axiosConfig);
}
