import useAppStore from "@/store/AppStore";
import React, { useEffect, useState } from "react";
import Model from "./Model";
import CreateTask from "./CreateTask";
import updateTask from "@/utils/updateTask";
import fetchUserData from "@/utils/fetchUserData";
import updateProject from "@/utils/updateProject";
import Task from "./Task";
import { Project } from "@/utils/app.types";
import ButtonWithChevron from "./ButtonWithChevron";
import ProjectControlPanel from "./ProjectControlPanel";
import ProjectControlCategory from "./ProjectControlCategory";
import Info from "./Tooltip";
import Tooltip from "./Tooltip";
import SearchBar from "./SearchBar";

interface IProjectModal {
  project: Project | null;
  onClose: () => void;
}
const ProjectModal = ({ project, onClose }: IProjectModal) => {
  const { userData, setUserData } = useAppStore();
  const employee = project!.employee;
  const { name, description } = project!;
  const [selectedTeammate, setSelectedTeammate] = useState(null);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ name, description });
  const finished = project?.tasks.filter((task) => task.completed);
  const todos = project?.tasks.filter((task) => !task.completed);

  useEffect(() => {
    const { name, description } = project!;
    setEditedData({ name, description });
  }, [project]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    await updateProject(project!.id, editedData);
    setUserData(await fetchUserData());
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedData({ name, description });
    setIsEditing(false);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEditedData((prev) => ({ ...prev, name: val }));
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEditedData((prev) => ({ ...prev, description: val }));
  };

  const onAddTask = () => {
    setisModalOpen(!isModalOpen);
  };
  const onCloseModal = () => {
    setisModalOpen(false);
  };

  return (
    <div className="pr-4 w-full h-full ">
      <div className="border-[#292f4c] py-6 border-b-[2px] ">
        <div>
          <input
            value={editedData.name}
            onChange={onNameChange}
            onBlur={() =>
              updateProject(project?.id!, { name: editedData.name! })
            }
            className="focus:border-gray-500 focus:border-[0.3px] bg-transparent hover:bg-[#404259] p-1 rounded-sm w-max h-full text-3xl d focus:outline-none"
          />
          <Tooltip> Shows project details </Tooltip>
        </div>

        <input
          value={editedData.description!}
          onChange={onDescriptionChange}
          onBlur={() =>
            updateProject(project?.id!, { name: editedData.description! })
          }
          className="focus:border-gray-500 focus:border-[0.3px] bg-transparent hover:bg-[#404259] p-1 rounded-sm w-max h-full text-sm d focus:outline-none"
        />
      </div>

      <div className="box-border flex items-center gap-2 my-5 w-full h-8 ">
        <ButtonWithChevron onClick={onAddTask}>New Task</ButtonWithChevron>

        <SearchBar isExpandable={true} />
      </div>

      <ProjectControlCategory color={"sky"} title={"To Do"} tasks={todos} />
      <ProjectControlCategory color={"green"} title={"Done"} tasks={finished} />

      {isModalOpen && (
        <Model onClose={onCloseModal}>
          <CreateTask onSubmit={onCloseModal} projectId={project!.id} />
        </Model>
      )}
    </div>
  );
};

export default ProjectModal;
