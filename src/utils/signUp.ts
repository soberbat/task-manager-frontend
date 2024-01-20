import axios from "axios";

const config = {
  withCredentials: true,
  credentials: "include",
  headers: {
    "Origin-Allow-Credentials": true,
    "Access-Control-Allow-Credentials": true,
  },
};

const productionUrl = "https://api.taskermanager.online/auth/signup";
const endpoint = "http://localhost:3001/auth/signup";

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
