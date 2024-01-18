import axios from "axios";

export default async (taskId: number) => {
  try {
    const response = await axios.delete(
      `https://api.taskermanager.online/tasks/${taskId}`
    );
    console.log("Task deleted successfully:", response.data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
