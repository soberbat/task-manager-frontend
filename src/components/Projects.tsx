import useAppStore from "@/store/AppStore";
import addProject from "@/utils/addProject";
import deleteProject from "@/utils/deleteProject";
import fetchUserData from "@/utils/fetchUserData";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Model from "./Model";
import findProject from "@/utils/findProject";
import CreateProjectModal from "./CreateProjectModal";
import ProjectModal from "./ProjectModal";
import { Project } from "@/utils/app.types";

enum Modal {
  ProjectModal,
  CreateProjectModal,
}

const Projects = () => {
  const { setUserData, userData } = useAppStore();
  const [isModelOpen, setisModelOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [projectId, setProjectId] = useState(0);
  const [ModalType, setModalType] = useState<Modal>(Modal.CreateProjectModal);

  const onAddProjectClick = () => {
    setModalType(Modal.CreateProjectModal);
    setisModelOpen(true);
  };

  const getProjectInfo = async () => {
    const project = await findProject(projectId);
    setProject(project);
  };

  useEffect(() => {
    getProjectInfo();
  }, [userData, projectId]);

  const onModalClose = () => {
    setisModelOpen(false);
  };

  const onProjectClick = async (projectId: number) => {
    setProjectId(projectId);
    const project = await findProject(projectId);
    setProject(project);
    setModalType(Modal.ProjectModal);
    setisModelOpen(true);
  };

  const onProjectDelete = async (projectId: number) => {
    await deleteProject(projectId);
    const data = await fetchUserData();
    setUserData(data!);
  };

  return (
    <div className="text-black p-6 h-full flex gap-2  content-start  justify-center   flex-wrap ">
      <AnimatePresence>
        <motion.div
          layout
          onClick={onAddProjectClick}
          key={"3131"}
          className=" w-60 h-12 border  cursor-pointer  border-gray-200  flex items-center justify-center text-gray-500   text-sm bg-white rounded-lg "
        >
          <span>+ Add a Project</span>
        </motion.div>
        {userData?.projects?.map(({ name, id }) => (
          <motion.div
            key={id}
            layout
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className=" w-60 h-12 border  border-gray-200  relative flex items-center justify-center text-gray-500   text-sm bg-white rounded-lg "
          >
            <span className="cursor-pointer" onClick={() => onProjectClick(id)}>
              {" "}
              {name}{" "}
            </span>
            <span
              className=" block  cursor-pointer absolute right-1  transform  top-1/2 -translate-y-1/2 "
              onClick={() => onProjectDelete(id)}
            >
              X
            </span>
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {isModelOpen && (
          <Model onClose={onModalClose}>
            {ModalType === Modal.CreateProjectModal ? (
              <CreateProjectModal setisModelOpen={setisModelOpen} />
            ) : (
              <ProjectModal onClose={onModalClose} project={project} />
            )}
          </Model>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
