import useAppStore from "@/store/AppStore";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Model from "./Model";
import CreateProjectModal from "./CreateProjectModal";
import SearchBar from "./SearchBar";
import deleteProject from "@/utils/deleteProject";
import fetchUserData from "@/utils/fetchUserData";

const SideBar = () => {
  const { userData, setProjectId, setUserData } = useAppStore();
  const [isBarVisible, setIsBarVisible] = useState(true);
  const [isModelOpen, setisModelOpen] = useState(false);
  const { setActiveTab, activeTab } = useAppStore();
  const tabs = ["Home", "Team"];

  const onModalClose = () => {
    setisModelOpen(false);
  };

  const onAddProjectClick = () => {
    setisModelOpen(true);
  };

  const onRemoveProject = async (id: number) => {
    await deleteProject(id);
    const data = await fetchUserData();
    setUserData(data);
  };
  return (
    <motion.div
      animate={{ width: isBarVisible ? "20%" : "1%" }}
      className="bg-[#191b34] rounded-tr-xl text-gray-400 "
    >
      <div className="border-[#292f4c] px-4 py-3 border-b-[1px] ">
        {tabs.map((tab, i) => (
          <div
            onClick={() => setActiveTab(i)}
            className="hover:bg-[#292f4c] p-[0.8vh] rounded-[5px] w-[90%] font-thin text-[#d6d8df] text-sm cursor-pointer "
          >
            <img className="inline-block mr-1" src={`/${tab}.svg`} alt="" />{" "}
            {tab}
          </div>
        ))}
      </div>

      <div className="px-4 py-3 font-thin text-[#d6d8df] ">
        <div className="hover:bg-[#292f4c] mb-2 p-[0.8vh] rounded-[5px] font-normal text-[#d6d8df] text-sm ">
          <img className="inline-block mr-1" src={`projects.svg`} alt="" />{" "}
          Projects
        </div>

        <div className="flex justify-between items-center h-8">
          <div className="flex-[0.95]">
            <SearchBar isExpandable={false} />
          </div>
          <span
            onClick={onAddProjectClick}
            className="flex justify-center items-center bg-blue-500 p-2 rounded-[4px] w-8 h-8 text-sm cursor-pointer "
          >
            +
          </span>
        </div>

        <div className="mt-3">
          {userData?.projects?.map(({ name, id }) => (
            <div
              onClick={() => {
                setActiveTab(2);
                setProjectId(id);
              }}
              className="relative flex gap-3 hover:bg-[#292f4c] px-2 py-2 rounded-[5px] text-sm cursor-pointer group"
            >
              <img src="/project.svg" alt="" />
              <span> {name} </span>
              <img
                src="x-lg.svg"
                className="top-1/2 right-4 absolute opacity-0 group-hover:opacity-100 ml-2 w-3 h-3 -translate-y-1/2 cursor-pointer "
                alt=""
                onClick={() => onRemoveProject(id)}
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModelOpen && (
          <Model onClose={onModalClose}>
            <CreateProjectModal setisModelOpen={setisModelOpen} />
          </Model>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SideBar;
