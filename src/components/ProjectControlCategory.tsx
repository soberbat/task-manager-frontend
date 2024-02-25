import React, { useState } from "react";
import ProjectControlPanel from "./ProjectControlPanel";
import { Task } from "@/utils/app.types";

interface IProjectControlCategory {
  tasks: Task[] | undefined;
  title: string | undefined;
  color: string;
}

const ProjectControlCategory = ({
  tasks,
  title,
  color,
}: IProjectControlCategory) => {
  const [isControlPanelOpen, setisControlPanelOpen] = useState(false);
  const bg = !isControlPanelOpen ? "#31324f" : "";
  const borderWidth = !isControlPanelOpen ? "5px" : 0;
  const pad = !isControlPanelOpen ? "py-2" : "";

  return (
    <div>
      <div
        className={`box-border  flex items-baseline bg-[${bg}] mt-7 ${pad} px-2  border-l-[${borderWidth}] border-l-${color}-500 rounded-l-md  `}
      >
        <img
          onClick={() =>
            tasks!.length > 0 && setisControlPanelOpen(!isControlPanelOpen)
          }
          className="mr-3 w-3 "
          src="/chevron.svg"
          alt=""
        />
        <div className="inline-block ">
          <h1 className={`font-medium text-lg  text-${color}-500 `}>{title}</h1>
          {!isControlPanelOpen && (
            <span className="font-thin text-gray-400 text-sm">
              {tasks!.length} Task
            </span>
          )}
        </div>
      </div>

      {isControlPanelOpen && <ProjectControlPanel tasks={tasks!} />}
    </div>
  );
};

export default ProjectControlCategory;
