import axios from "axios";

const productionUrl = "https://api.taskermanager.site/tasks";
const devUrl = "http://localhost:3001/tasks";

type TaskData = {
  userId: number | null | undefined;
  projectId: number | null | undefined;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
};
export default async (taskData: TaskData) => {
  try {
    const response = await axios.post(devUrl, taskData);
    console.log("Task created successfully:", response.data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
