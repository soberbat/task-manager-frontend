import { AnimatePresence, motion } from "framer-motion";
import React, { FC, ReactNode } from "react";
import { ITabBar } from "./TopBar";
import { Tabs } from "@/utils/app.types";
import Home from "./Home";
import Team from "./Team";
import Tasks from "./Tasks";
import Projects from "./Projects";
import useAppStore from "@/store/AppStore";
import UpdateTask from "./UpdateTask";

interface MainContent {}

const MainContent: FC<MainContent> = () => {
  const { activeTab, isUpdateTaskVisible } = useAppStore();
  const componentMap: Record<Tabs, FC> = {
    [Tabs.HOME]: Home,
    [Tabs.TEAM]: Team,
    [Tabs.PROJECTS]: Projects,
  };

  const ComponentToRender = componentMap[activeTab];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      layout
      key={activeTab}
      className="relative bg-[#191b34] ml-auto border-black rounded-tl-xl w-[99%] h-full"
    >
      <ComponentToRender />
      <AnimatePresence>{isUpdateTaskVisible && <UpdateTask />}</AnimatePresence>
    </motion.div>
  );
};

export default MainContent;
