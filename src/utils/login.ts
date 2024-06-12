import axios from "axios";
import axiosConfig from "./axios.config";

const prodEndpoint = "https://backend.taskermanager.site/auth/signin";
const devEndpoint = "http://localhost:3001/auth/signin";

export default async function Login(email: string, password: string) {
  try {
    return await axios.post(devEndpoint, { email, password }, axiosConfig);
  } catch (error) {
    return { status: 401 };
  }
}
