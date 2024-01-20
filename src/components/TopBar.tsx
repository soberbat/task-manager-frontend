import useAppStore from "@/store/AppStore";
import { motion } from "framer-motion";
import React, { FC, useState } from "react";
import Navigation from "./Navigation";
import createTask from "@/utils/createTask";
import fetchUserData from "@/utils/fetchUserData";

export interface ITabBar {}

const TabBar: FC<ITabBar> = () => {
  const { userData, userId, setUserData } = useAppStore();

  // const handleCreateTask = async () => {
  //   await createTask(userId);
  //   const data = await fetchUserData();
  //   setUserData(data!);
  // };

  return (
    <div className="h-[7vh]  border-gray-200 border bg-white   px-2 flex items-center justify-between  border-t-0 ">
      <div className=" w-10 h-10 items-center justify-center flex  font-extrabold  text-2xl rounded-full  bg-gray-100  text-black   text-[0.8rem]">
        {userData?.username[0]}
      </div>

      <Navigation />
      <div
        // onClick={handleCreateTask}
        className="  p-[0.6rem]  px-6   font-extrabold   text-white bg-[#0028a1] rounded-full    text-[0.7rem]"
      >
        + TASK
      </div>
    </div>
  );
};

export default TabBar;
