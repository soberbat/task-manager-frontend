import { UserData } from "./app.types";

export default async (userId: number) => {
  try {
    const response = await fetch(`http://localhost:3001/employee/${userId}`);
    const data: UserData = await response.json();
    return data;
  } catch (error) {}
};
