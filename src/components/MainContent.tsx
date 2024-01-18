import { motion } from "framer-motion";
import React, { FC, ReactNode } from "react";
import { ITabBar } from "./TopBar";
import { Tabs } from "@/utils/app.types";
import Home from "./Home";
import Team from "./Team";
import Tasks from "./Tasks";
import Projects from "./Projects";
import useAppStore from "@/store/AppStore";

interface MainContent {}

const MainContent: FC<MainContent> = () => {
  const { activeTab } = useAppStore();
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
      className="w-full h-full overflow-scroll border-black bg-[#f7f8fa]"
    >
      <ComponentToRender />
    </motion.div>
  );
};

export default MainContent;
