import axios from "axios";

const productionUrl = "https://api.taskermanager.online/tasks";
const devUrl = "http://localhost:3001/tasks";

type TaskData = {
  userId: number;
  projectId: number | null;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
};
export default async (taskData: TaskData) => {
  try {
    const response = await axios.post(productionUrl, taskData);
    console.log("Task created successfully:", response.data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
