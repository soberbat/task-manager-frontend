import useAppStore from "@/store/AppStore";
import fetchUserData from "@/utils/fetchUserData";
import removeTask from "@/utils/removeTask";
import React, { useEffect, useState } from "react";
import Task from "./Task";
import Model from "./Model";
import CreateTask from "./CreateTask";

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
    <div className=" bg-white h-full  overflow-scroll  p-10">
      <div className="max-w-4xl   mx-auto ">
        <div className=" flex mb-6 pb-5  border-b-2 border-gray-100  items-center justify-between">
          <div className="flex  text-black    items-start flex-col">
            <h1 className="text-2xl  font-medium">Home</h1>
            <span className="text-gray-500  font-normal text-lg">
              Tuesday, January 16
            </span>
          </div>

          <div
            onClick={onAddProjectClick}
            className="p-1   w-8 h-8   font-extrabold items-center flex  justify-center    cursor-pointer  text-white bg-[#0028a1] rounded-full    text-[0.7rem]"
          >
            +
          </div>
        </div>
        <div>
          <h1 className="text-black mb-3   text-lg">My Tasks</h1>
          <div>
            {userData?.tasks.map((task, i) => (
              <Task key={i} task={task} />
            ))}
          </div>

          {isModalOpen && (
            <Model onClose={onCloseModal}>
              <CreateTask userId={userData?.id} onSubmit={onCloseModal} />
            </Model>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
