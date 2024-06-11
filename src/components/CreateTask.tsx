import useAppStore from "@/store/AppStore";
import createTask from "@/utils/createTask";
import fetchUserData from "@/utils/fetchUserData";
import React, { useState } from "react";

interface ICreateTask {
  projectId?: number;
  onSubmit: () => void;
  userId?: number;
}

const CreateTask = ({ projectId, onSubmit, userId }: ICreateTask) => {
  const inputstyle =
    "bg-[#292f4c] mt-1 p-2 border focus:border-blue-500 border-gray-500 hover:border-gray-400 rounded-[4px] w-full text-sm focus:outline-none ";
  const { userData, setUserData } = useAppStore();
  const teamMembers = userData?.teams?.[0]?.team?.members;
  const [taskData, setTaskData] = useState({
    userId: userId ?? userData?.id,
    projectId: projectId && projectId,
    title: "",
    description: "",
    priority: "low",
    completed: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: name === "userId" ? Number(newValue) : newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTask(taskData);
    const data = await fetchUserData();
    setUserData(data);
    onSubmit();
  };

  return (
    <div className="z-10 bg-[#191b34] shadow-2xl px-8 py-6 rounded-[8px] h-full text-s ">
      <h2 className="mb-4 font-normal text-[#d6d8df] text-3xl">Add a Task</h2>

      <form
        className="flex flex-col mt-4 h-[85%] font-thin"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 text-[#d6d8df] ">
          <label htmlFor="title" className="block text-[#d6d8df] ">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            className={inputstyle}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-[#d6d8df] ">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            className={inputstyle}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="priority" className="block text-[#d6d8df] ">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className={inputstyle}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {!userId && (
          <div className="mb-4">
            <label htmlFor="userId" className="block text-[#d6d8df] ">
              Assignee
            </label>
            <select
              id="userId"
              name="userId"
              value={taskData.userId}
              onChange={handleChange}
              className={inputstyle}
            >
              <option value={0} disabled>
                Select assignee
              </option>
              {teamMembers!.map(({ employee }) => (
                <option key={employee.id} value={Number(employee.id)}>
                  {employee.username}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-auto self-end">
          <span>Cancel</span>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 ml-3 px-4 py-2 rounded-md text-white focus:outline-none"
          >
            Submit Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
