import useAppStore from "@/store/AppStore";
import { motion } from "framer-motion";
import React, { FC, useState } from "react";
import Navigation from "./Navigation";
import createTask from "@/utils/createTask";
import fetchUserData from "@/utils/fetchUserData";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Logout from "@/utils/logout";
import UserProfile from "./UserProfile";

export interface ITabBar {}

const TabBar: FC<ITabBar> = () => {
  const { userData, userId, setUserData } = useAppStore();
  const router = useRouter();
  const handleLogOut = async () => {
    await Logout();
    router.push("/login");
  };

  return (
    <div className="z-0 flex justify-between items-center bg-[#292f4c] px-2 h-[5.5vh] ">
      <img src="/logo2.png" className="w-20" alt="" />
      <div className="flex items-center gap-5 mr-3">
        <UserProfile firstLetter={userData?.username[0]} />
        <img
          onClick={handleLogOut}
          className="w-5 h-5 cursor-pointer"
          src="/logout.svg"
        />
      </div>
    </div>
  );
};

export default TabBar;
