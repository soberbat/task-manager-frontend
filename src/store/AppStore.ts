"use client";
import { Tabs, Task, UserData } from "@/utils/app.types";
import { create } from "zustand";

interface AppStore {
  userId: number;
  setUserId: (id: number) => void;
  teamId: number;
  setTeamId: (id: number) => void;
  activeTab: Tabs;
  setActiveTab: (activeTab: number) => void;
  userData: UserData | null;
  setUserData: (userData: UserData) => void;
  projectId: number | null;
  setProjectId: (projectId: number) => void;
  isUpdateTaskVisible: boolean;
  setIsUpdateTaskVisible: (isVisible: boolean) => void;
  taskToUpdate: Task | null;
  setTaskToUpdate: (task: Task) => void;
}

const useAppStore = create<AppStore>((set) => ({
  userId: 3,
  setUserId: (id) => set({ userId: id }),
  teamId: 1,
  setTeamId: (id) => set({ teamId: id }),
  activeTab: 0,
  setActiveTab: (activeTab: number) => set({ activeTab }),
  userData: null,
  setUserData: (userData: UserData) => set({ userData }),
  projectId: null,
  setProjectId: (projectId) => set({ projectId }),
  isUpdateTaskVisible: false,
  setIsUpdateTaskVisible: (isVisible) =>
    set({ isUpdateTaskVisible: isVisible }),
  taskToUpdate: null,
  setTaskToUpdate: (task: Task) => set({ taskToUpdate: task }),
}));

export default useAppStore;
