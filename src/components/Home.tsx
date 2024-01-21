import useAppStore from "@/store/AppStore";
import fetchUserData from "@/utils/fetchUserData";
import removeTask from "@/utils/removeTask";
import React, { useEffect } from "react";
import Task from "./Task";

const Home = () => {
  const { userData, setUserData, userId } = useAppStore();

  const handleTaskRemove = async (taskId: number) => {
    removeTask(taskId);
    const userData = await fetchUserData();
    setUserData(userData!);
  };

  console.log(userData?.tasks);
  return (
    <div className=" bg-white h-full  overflow-scroll  p-10">
      <div className="max-w-4xl   mx-auto ">
        <div className="flex mb-6 pb-5 text-black border-b-2  border-gray-100 items-start flex-col">
          <h1 className="text-2xl  font-medium">Home</h1>
          <span className="text-gray-500  font-normal text-lg">
            Tuesday, January 16
          </span>
        </div>
        <div>
          <h1 className="text-black mb-3   text-lg">My Tasks</h1>
          <div>
            {userData?.tasks.map((task, i) => (
              <Task key={i} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
