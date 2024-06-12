import axios from "axios";

export default async (taskId: number) => {
  const productionUrl = `https://backend.taskermanager.site/tasks/${taskId}`;
  const devUrl = `http://localhost:3001/tasks/${taskId}`;
  try {
    const response = await axios.delete(productionUrl);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
