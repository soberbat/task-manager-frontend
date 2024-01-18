import axios from "axios";

export default async (projectId: number) => {
  try {
    const response = await axios.delete(
      `https://api.taskermanager.online/project/${projectId}`
    );
    console.log("Project deleted successfully:", response.data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
