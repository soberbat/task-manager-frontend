import axios from "axios";
import axiosConfig from "./axios.config";

export default async (teamId: number, employeeId?: number) => {
  const project = {
    name: "Test Project",
    description: "This is a fake Project for testing purposes.",
    teamId,
    employeeId,
  };

  try {
    const response = await axios.post(
      "http://localhost:3005/project",
      // "https://api.taskermanager.online/project",
      project,
      axiosConfig
    );
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
