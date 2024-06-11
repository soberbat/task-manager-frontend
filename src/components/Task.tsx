import useAppStore from "@/store/AppStore";
import { Task } from "@/utils/app.types";
import fetchUserData from "@/utils/fetchUserData";
import removeTask from "@/utils/removeTask";
import updateTask, { TaskData } from "@/utils/updateTask";
import React, { ChangeEvent, useState } from "react";
import ColoredCell from "./ColoredCell";
import getPriorityColor from "@/utils/getPriorityColor";
import PriorityUpdater from "./PriorityUpdater";
import OwnerUpdater from "./OwnerUpdater";
import UserProfile from "./UserProfile";

interface ITask {
  task: Task;
  isInMyTasks?: boolean;
}

const Task = ({ task, isInMyTasks }: ITask) => {
  const [isAssigningTask, setIsAssigningTask] = useState(false);
  const { userData, setUserData } = useAppStore();
  const teamMembers = userData?.teams?.[0]?.team?.members;
  const [isEditMode, setisEditMode] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskPriority, setTaskPriority] = useState(task.priority);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTaskTitle(e.target.value);

  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setTaskDescription(e.target.value);

  const onRemoveTask = async () => {
    await removeTask(task.id);
    const userData = await fetchUserData();
    setUserData(userData);
  };

  const updateCurrentTask = async (data: TaskData) => {
    await updateTask(data, task!.id);
    const userData = await fetchUserData();
    setUserData(userData);
  };

  return (
    <div className="flex items-stretch w-full font-thin ">
      <div className="flex flex-[0.9] items-center border-[0.2px] border-gray-600 ">
        <div className="relative w-full h-full group">
          <input
            value={taskTitle}
            onChange={onTitleChange}
            onBlur={() => updateCurrentTask({ title: taskTitle })}
            className="focus:border-gray-500 focus:border-[0.3px] bg-transparent hover:bg-[#404259] hover:border hover:border-dotted rounded-sm w-full h-full indent-2 focus:outline-none"
          />
          <img
            src="x-lg.svg"
            className="top-1/2 right-4 absolute opacity-0 group-hover:opacity-100 ml-2 -translate-y-1/2 cursor-pointer "
            alt=""
            onClick={onRemoveTask}
          />
        </div>
      </div>
      <div className="flex-[0.5] border-[0.2px] border-gray-600 ">
        <textarea
          onBlur={() => updateCurrentTask({ description: taskDescription! })}
          value={taskDescription!}
          onChange={onTextAreaChange}
          className="focus:border-gray-500 focus:border-[0.3px] bg-transparent hover:bg-[#404259] p-2 hover:border hover:border-dotted rounded-sm w-full h-8 focus:h-36 min-h-full text-center transition-all duration-150 ease-out focus:outline-none indent-2"
        />
      </div>
      <div className="relative relativejustify-center flex flex-[.2] items-center border-[0.2px] border-gray-600 group">
        <div className="opacity-0 group-hover:opacity-100 w-full ">
          <OwnerUpdater updateTask={updateCurrentTask} task={task} />
        </div>

        <div className="top-0 left-0 absolute flex justify-center items-center w-full h-full">
          <UserProfile
            isSmallSize={true}
            firstLetter={task.employee.username[0]}
          />
        </div>
      </div>
      <div className="relative flex-[.2] border-[0.2px] border-gray-600 group">
        <div className="opacity-0 group-hover:opacity-100 w-full ">
          <PriorityUpdater updateTask={updateCurrentTask} />
        </div>
        <ColoredCell color={getPriorityColor(task.priority)}>
          {task.priority}
        </ColoredCell>
      </div>
    </div>
  );
};

export default Task;
