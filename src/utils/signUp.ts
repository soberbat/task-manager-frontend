import axios from "axios";

const config = {
  withCredentials: true,
  credentials: "include",
  headers: {
    "Origin-Allow-Credentials": true,
    "Access-Control-Allow-Credentials": true,
  },
};

const productionUrl = "https://api.taskermanager.site/auth/signup";
const devUrl = "http://localhost:3001/auth/signup";

export default async function SignUp(
  username: string,
  password: string,
  email: string
) {
  try {
    const response = await axios.post(
      productionUrl,
      {
        username,
        password,
        email,
      },
      config
    );

    return response;
  } catch (error) {
    return { status: 401 };
  }
}
