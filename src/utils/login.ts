import axios from "axios";
import axiosConfig from "./axios.config";

const prodEndpoint = "https://api.taskermanager.online/auth/signin";
const devEndpoint = "http://localhost:3001/auth/signin";

export default async function Login(email: string, password: string) {
  return axios.post(prodEndpoint, { email, password }, axiosConfig);
}
