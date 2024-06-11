import axios from "axios";

export default async (teamId: number, userId: number) => {
  try {
    const response = await axios.delete(
      `https://api.taskermanager.site/team/${teamId}/employee/${userId}`
    );
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
