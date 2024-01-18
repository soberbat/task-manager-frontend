import axios from "axios";

export default async (teamId: number, userId: number) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/team/${teamId}/employee/${userId}`
    );
    console.log("Employee deleted successfully:", response.data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};