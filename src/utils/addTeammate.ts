import axios from "axios";

export default async (teamId: number, userId: number) => {
  try {
    const response = await axios.patch(
      `https://api.taskermanager.online/team/${teamId}/employee/${userId}`
    );
    console.log("Task created successfully:", response.data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
