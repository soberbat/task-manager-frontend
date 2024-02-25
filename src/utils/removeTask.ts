import axios from "axios";

export default async (taskId: number) => {
  const productionUrl = `https://api.taskermanager.site/tasks/${taskId}`;
  const devUrl = `http://localhost:3001/tasks/${taskId}`;
  try {
    const response = await axios.delete(productionUrl);
    console.log("Task deleted successfully:", response.data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
