import useAppStore from "@/store/AppStore";
import axios from "axios";
import fetchUserData from "./fetchUserData";

export default async (userId: number) => {
  const task = {
    title: "Sample Task",
    description: "This is a fake task for testing purposes.",
    priority: "High",
    completed: false,
    userId,
  };

  try {
    const response = await axios.post("http://localhost:3001/tasks", task);
    console.log("Task created successfully:", response.data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
