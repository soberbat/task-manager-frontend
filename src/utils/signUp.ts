import axios from "axios";

const config = {
  withCredentials: true,
  credentials: "include",
  headers: {
    "Origin-Allow-Credentials": true,
    "Access-Control-Allow-Credentials": true,
  },
};

const productionUrl = "https://api.taskermanager.online/employee";
const endpoint = "http://localhost:3005/employee";

export default async function SignUp(
  username: string,
  password: string,
  email: string
) {
  return axios.post(
    productionUrl,
    {
      username,
      password,
      email,
    },
    config
  );
}
