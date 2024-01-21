import useAppStore from "@/store/AppStore";
import { motion } from "framer-motion";
import React, { FC, useState } from "react";
import Navigation from "./Navigation";
import createTask from "@/utils/createTask";
import fetchUserData from "@/utils/fetchUserData";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Logout from "@/utils/logout";

export interface ITabBar {}

const TabBar: FC<ITabBar> = () => {
  const { userData, userId, setUserData } = useAppStore();
  const router = useRouter();
  const handleLogOut = async () => {
    await Logout();
    router.push("/login");
  };

  return (
    <div className="h-[7vh]  border-gray-200 border bg-white   px-2 flex items-center justify-between  border-t-0 ">
      <div className=" w-10 h-10 items-center justify-center flex  font-extrabold  text-2xl rounded-full  bg-gray-100  text-black   text-[0.8rem]">
        {userData?.username[0]}
      </div>

      <Navigation />

      <div
        className=" flex items-center w-10 h-10 rounded-full cursor-pointer bg-gray-100  text-[.8rem] break-words flex-col justify-center  text-black"
        onClick={handleLogOut}
      >
        <div className=" transform  text-2xl flex items-center     text-gray-600 justify-center -scale-x-100">
          {" "}
          &#8592;{" "}
        </div>
      </div>
    </div>
  );
};

export default TabBar;
