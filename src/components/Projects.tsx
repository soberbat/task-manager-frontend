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
  const { setUserData, userData, projectId } = useAppStore();
  const [isModelOpen, setisModelOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [ModalType, setModalType] = useState<Modal>(Modal.CreateProjectModal);

  const onAddProjectClick = () => {
    setModalType(Modal.CreateProjectModal);
    setisModelOpen(true);
  };

  const getProjectInfo = async () => {
    const project = await findProject(projectId!);
    setProject(project);
  };

  useEffect(() => {
    if (projectId) getProjectInfo();
  }, [userData, projectId]);

  const onModalClose = () => {
    setisModelOpen(false);
  };

  const onProjectDelete = async (projectId: number) => {
    await deleteProject(projectId);
    const data = await fetchUserData();
    setUserData(data!);
  };

  return (
    <div className="flex flex-wrap justify-center content-start gap-2 bg-[#191b34] ml-12 h-full text-[#d6d8df] ">
      {project && <ProjectModal onClose={onModalClose} project={project} />}
    </div>
  );
};

export default Projects;
