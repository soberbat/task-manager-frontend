import useAppStore from "@/store/AppStore";
import addProject from "@/utils/addProject";
import deleteProject from "@/utils/deleteProject";
import fetchUserData from "@/utils/fetchUserData";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const Projects = () => {
  const { teamId, userId, setUserData, userData } = useAppStore();
  const [isModelOpen, setisModelOpen] = useState(false);
  const onAddProjectClick = async () => {
    await addProject(teamId, userId);
    const data = await fetchUserData(userId);
    setUserData(data!);
  };

  const onProjectDelete = async (projectId: number) => {
    await deleteProject(projectId);
    const data = await fetchUserData(userId);
    setUserData(data!);
  };

  return (
    <div className="text-black p-6 h-full flex gap-2  content-start  justify-center   flex-wrap ">
      <AnimatePresence>
        <motion.div
          layout
          key={"3131"}
          className=" w-60 h-12 border cursor-pointer border-gray-200  flex items-center justify-center text-gray-500   text-sm bg-white rounded-lg "
        >
          <span onClick={onAddProjectClick}>+ Add a Project</span>
        </motion.div>
        {userData?.projects?.map(({ name, id }) => (
          <motion.div
            key={id}
            layout
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className=" w-60 h-12 border cursor-pointer border-gray-200  flex items-center justify-center text-gray-500   text-sm bg-white rounded-lg "
          >
            <span> {name} </span>
            <span onClick={() => onProjectDelete(id)}>X</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
