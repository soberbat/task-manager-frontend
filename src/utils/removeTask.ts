import axios from "axios";

export default async (taskId: number) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/tasks/${taskId}`
    );
    console.log("Task deleted successfully:", response.data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
