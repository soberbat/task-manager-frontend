import { UserData } from "./app.types";

export default async (userId: number) => {
  const productionUrl = `https://api.taskermanager.online/employee/${userId}`;
  const devUrl = `http://localhost:3005/employee/${userId}`;
  try {
    const response = await fetch(productionUrl);

    const data: UserData = await response.json();
    return data;
  } catch (error) {}
};
