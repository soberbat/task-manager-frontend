import useAppStore from "@/store/AppStore";
import React, { useEffect, useState } from "react";
import Model from "./Model";
import CreateTask from "./CreateTask";
import updateTask from "@/utils/updateTask";
import fetchUserData from "@/utils/fetchUserData";
import updateProject from "@/utils/updateProject";
import Task from "./Task";
import { Project } from "@/utils/app.types";

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

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onAddTask = () => {
    setisModalOpen(!isModalOpen);
  };
  const onCloseModal = () => {
    setisModalOpen(false);
  };

  return (
    <div>
      <div
        className={`bg-white p-12 rounded  overflow-scroll   h-screen w-screen top-0 left-0 fixed ${
          isEditing ? "-2 -blue-500" : ""
        }`}
      >
        <div
          onClick={onClose}
          className="go-back-button mb-2 absolute top-3 left-12 "
        >
          &#8592; Go Back
        </div>
        <div className="mb-4">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full  text-4xl font-semibold  focus:outline-none focus:border-b focus:border-b-gray-200 text-gray-700 "
            />
          ) : (
            <div className="mt-1 p-2 text-4xl font-semibold  text-gray-700 rounded-md">
              {editedData.name}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block   text-xl font-medium text-gray-600">
            Details:
          </label>
          {isEditing ? (
            <textarea
              name="description"
              value={editedData.description!}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full   focus:outline-none focus:border-b focus:border-b-gray-200 "
            />
          ) : (
            <div className="mt-1 p-2  rounded-md">{editedData.description}</div>
          )}
        </div>

        <div>
          {project!.tasks.map((task) => (
            <Task isInMyTasks={false} key={task.id} task={task} />
          ))}
        </div>

        <div className="flex absolute top-3 right-12 justify-end">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveClick}
                className="bg-gray-100     px-6 h-8    mr-3  text-black   rounded-lg hover:bg-gray-300 focus:outline-none focus:ring focus:-green-300 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-gray-100     px-6 h-8    text-black   rounded-lg hover:bg-gray-300 focus:outline-none focus:ring focus:-gray-300 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <div>
              <button
                onClick={handleEditClick}
                className="bg-gray-100     px-6 h-8    text-black   rounded-lg hover:bg-gray-300 focus:outline-none focus:ring focus:-blue-300 transition"
              >
                Edit
              </button>
              <button
                onClick={onAddTask}
                className="bg-gray-100  ml-2    px-6 h-8    text-black   rounded-lg hover:bg-gray-300 focus:outline-none focus:ring focus:-blue-300 transition"
              >
                + Add Task
              </button>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <Model onClose={onCloseModal}>
          <CreateTask onSubmit={onCloseModal} projectId={project!.id} />
        </Model>
      )}
    </div>
  );
};

export default ProjectModal;
