import React from "react";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import TabBar from "./TopBar";
import SideBar from "../components/SideBar";
import MainContent from "../components/MainContent";
import { Tabs } from "@/utils/app.types";
import useAppStore from "@/store/AppStore";

const MainApp = () => {
  return (
    <div className="h-screen overflow-hidden ">
      <TabBar />
      <div className="h-full flex ">
        <MainContent />
      </div>
    </div>
  );
};

export default MainApp;
