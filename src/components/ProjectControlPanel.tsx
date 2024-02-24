import React from "react";
import ProjectControlPanelCell from "./ProjectControlPanelCell";
import UserProfile from "./UserProfile";
import ColoredCell from "./ColoredCell";
import { Task } from "@/utils/app.types";
import converTime from "@/utils/converTime";
import getPriorityColor from "@/utils/getPriorityColor";
import useAppStore from "@/store/AppStore";

interface IProjectControlPanel {
  tasks: Task[];
}
const ProjectControlPanel = ({ tasks }: IProjectControlPanel) => {
  const { setIsUpdateTaskVisible, setTaskToUpdate } = useAppStore();

  const onCellUpdateClick = (task: Task) => {
    setIsUpdateTaskVisible(true);
    setTaskToUpdate(task);
  };

  return (
    <div className="mt-2 ">
      <div className="flex bg-[#31324f] border-l-[5px] border-l-sky-500 rounded-l-md font-thin ">
        <div className="flex-[0.9]">
          <ProjectControlPanelCell isCellTitle={true}>
            Task
          </ProjectControlPanelCell>
          {tasks.map((task) => (
            <ProjectControlPanelCell onClick={() => onCellUpdateClick(task)}>
              <div className="relative flex justify-center items-center w-full h-full cursor-pointer group">
                {task.title}
                <img
                  src="modify.svg"
                  className="top-1/2 right-4 absolute opacity-0 group-hover:opacity-100 ml-2 -translate-y-1/2 "
                  alt=""
                />
              </div>
            </ProjectControlPanelCell>
          ))}
        </div>

        <div className="flex-[0.2]">
          <ProjectControlPanelCell isCellTitle={true}>
            Owner
          </ProjectControlPanelCell>
          {tasks.map(({ employee }) => (
            <ProjectControlPanelCell>
              <UserProfile
                isSmallSize={true}
                firstLetter={employee.username[0]}
              />
            </ProjectControlPanelCell>
          ))}
        </div>

        <div className="flex-[0.3]">
          <ProjectControlPanelCell isCellTitle={true}>
            Status
          </ProjectControlPanelCell>
          {tasks.map(({ completed }) => (
            <ProjectControlPanelCell>
              <ColoredCell color={completed ? "bg-green-500" : "bg-purple-400"}>
                {completed ? "Done" : "To Do"}{" "}
              </ColoredCell>
            </ProjectControlPanelCell>
          ))}
        </div>

        <div className="flex-[0.5]">
          <ProjectControlPanelCell isCellTitle={true}>
            Last Updated
          </ProjectControlPanelCell>
          {tasks.map(({ updatedAt }) => (
            <ProjectControlPanelCell>
              {converTime(updatedAt)}
            </ProjectControlPanelCell>
          ))}
        </div>

        <div className="flex-[0.3]">
          <ProjectControlPanelCell isCellTitle={true}>
            Priority
          </ProjectControlPanelCell>
          {tasks.map(({ priority }) => (
            <ProjectControlPanelCell>
              <ColoredCell color={getPriorityColor(priority)}>
                {priority}
              </ColoredCell>
            </ProjectControlPanelCell>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectControlPanel;
