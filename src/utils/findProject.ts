import axios from "axios";

export default async (projectId: number) => {
  const productionUrl = `https://api.taskermanager.site/project/${projectId}`;
  const devUrl = `http://localhost:3001/project/${projectId}`;
  try {
    const response = await axios.get(productionUrl);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
