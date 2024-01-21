import useAppStore from "@/store/AppStore";
import { Task } from "@/utils/app.types";
import fetchUserData from "@/utils/fetchUserData";
import updateTask from "@/utils/updateTask";
import React, { useState } from "react";

interface ITask {
  task: Task;
  isInMyTasks?: boolean;
}

const Task = ({ task, isInMyTasks = true }: ITask) => {
  const [isAssigningTask, setIsAssigningTask] = useState(false);
  const { userData, setUserData } = useAppStore();
  const teamMembers = userData?.teams?.[0]?.team?.members;
  const [isEditMode, setisEditMode] = useState(false);
  const [taskData, setTaskData] = useState({
    description: task.description,
    title: task.title,
    priority: task.priority,
  });

  const handleAssignTaskClick = () => {
    if (!isEditMode) return;
    setIsAssigningTask(true);
  };
  const onEditClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditMode) {
      await updateTask(taskData, task.id);
      const userData = await fetchUserData();
      setUserData(userData);
      setisEditMode(false);
    } else {
      setisEditMode(true);
    }
  };

  const assignTask = async (taskId: number, employeeId: number) => {
    const data = { userId: employeeId };
    await updateTask(data, taskId);
    const userData = await fetchUserData();
    setUserData(userData);
    setIsAssigningTask(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
      default:
        return "bg-green-500";
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      [name]: value,
    }));
  };

  return (
    <div
      key={task.id}
      className="bg-white p-4 mb-4 border text-gray-500  relative  cursor-pointer rounded-md "
    >
      <h3 className="text-xl font-semibold">
        {isEditMode ? (
          <input
            type="text"
            id={`title-${task.id}`} // Add a unique identifier for each task
            name="title"
            value={taskData.title}
            onChange={handleChange}
            className="border-b bg-transparent  px-2 py-1"
          />
        ) : (
          taskData.title
        )}
      </h3>

      <p className="text-gray-600 mb-2">
        {isEditMode ? (
          <textarea
            id={`description-${task.id}`} // Add a unique identifier for each task
            name="description"
            value={taskData.description!}
            onChange={handleChange}
            className="mt-1 p-2 w-full     border-b bg-transparent "
          />
        ) : (
          taskData.description
        )}
      </p>

      <div className="top-1/2 transform -translate-y-1/2 flex items-center absolute bottom-3 right-3">
        {isEditMode ? (
          <div>
            <select
              id={`priority-${task.id}`} // Add a unique identifier for each task
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
              className="mt-1 p-2 border-b  bg-transparent "
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        ) : (
          <div
            className={`w-3 h-3 rounded-full mr-2 ${getPriorityColor(
              taskData.priority
            )}`}
          ></div>
        )}
        {!isInMyTasks && (
          <div
            onClick={handleAssignTaskClick}
            className="w-10 h-10 items-center justify-center flex cursor-pointer ont-extrabold text-2xl rounded-full bg-gray-100 text-black text-[0.8rem] ml-2"
          >
            {task.employee.username[0]}
          </div>
        )}
        <div onClick={onEditClick} className=" text-gray-500 ml-2">
          {" "}
          Edit
        </div>
      </div>

      {isAssigningTask && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4">Assign Task</h2>
            <p>Select a teammate to assign the task:</p>

            <ul className="mt-4">
              {teamMembers!.map(({ employee: { username, id } }) => (
                <li
                  key={id}
                  className="cursor-pointer py-2 hover:bg-gray-100"
                  onClick={() => assignTask(task.id, id)}
                >
                  {username}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setIsAssigningTask(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
