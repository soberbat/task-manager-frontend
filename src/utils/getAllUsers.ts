import { TeamMember } from "./app.types";

interface ApiResponse {
  data: {
    employees: TeamMember[];
  };
}
export default async () => {
  try {
    const response = await fetch("http://localhost:3001/employee/only-mails");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
