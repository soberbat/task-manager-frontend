import useAppStore from "@/store/AppStore";
import fetchUserData from "@/utils/fetchUserData";
import removeTask from "@/utils/removeTask";
import React, { useEffect, useState } from "react";
import Task from "./Task";
import Model from "./Model";
import CreateTask from "./CreateTask";
import TaskTable from "./TaskTable";
import HomeHideCheckBox from "./HomeHideCheckBox";
import Tooltip from "./Tooltip";

const Home = () => {
  const { userData, setUserData, userId } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskRemove = async (taskId: number) => {
    removeTask(taskId);
    const userData = await fetchUserData();
    setUserData(userData!);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onAddProjectClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="h-full text-[#d6d8df] overflow-scroll ">
      <div className="border-[#292f4c] p-8 border-b-[2px] ">
        <h1 className="inline-block m-0 mr-3 p-0 text-3xl ">
          My Current Tasks
        </h1>
        <Tooltip>Shows your tasks</Tooltip>
      </div>

      <div className="flex items-center gap-3 p-6 font-thin">
        <span
          onClick={onAddProjectClick}
          className="bg-blue-500 p-2 rounded-md text-sm cursor-pointer "
        >
          New Task
        </span>
      </div>

      <TaskTable userData={userData} />

      {isModalOpen && (
        <Model onClose={onCloseModal}>
          <CreateTask userId={userData?.id} onSubmit={onCloseModal} />
        </Model>
      )}
    </div>
  );
};

export default Home;
