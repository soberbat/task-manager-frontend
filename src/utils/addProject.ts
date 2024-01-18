import axios from "axios";

export default async (teamId: number, employeeId?: number) => {
  const project = {
    name: "Test Project",
    description: "This is a fake Project for testing purposes.",
    teamId,
    employeeId,
  };

  try {
    const response = await axios.post("http://localhost:3001/project", project);
    console.log("Project created successfully:", response.data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
