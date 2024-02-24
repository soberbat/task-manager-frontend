import axios from "axios";

export default async (projectId: number) => {
  const productionUrl = `https://api.taskermanager.online/project/${projectId}`;
  const devUrl = `http://localhost:3001/project/${projectId}`;
  try {
    const response = await axios.delete(devUrl);
    console.log("Project deleted successfully:", response.data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
