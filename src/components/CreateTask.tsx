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
  const { userData, setUserData } = useAppStore();
  const teamMembers = userData?.teams?.[0]?.team?.members;
  const [taskData, setTaskData] = useState({
    userId: userId ?? userData?.id,
    projectId: projectId && projectId,
    title: "",
    description: "",
    priority: "",
    completed: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    console.log(newValue);
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
    <div className="bg-white p-8 rounded shadow-md  h-full overflow-scroll ">
      <h2 className="text-2xl   text-gray-600 font-semibold mb-4">
        Add a Task
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4    text-gray-500">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border-b  focus:outline-none focus:border-b focus:border-b-gray-200 "
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full  border-b text-gray-600  focus:outline-none focus:border-b focus:border-b-gray-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-600"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="mt-1 p-2 w-full border-b text-gray-600  focus:outline-none focus:border-b focus:border-b-gray-200"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {!userId && (
          <div className="mb-4">
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-600"
            >
              Assignee
            </label>
            <select
              id="userId"
              name="userId"
              value={taskData.userId}
              onChange={handleChange}
              className="mt-1 p-2 w-full  border-b focus:outline-none focus:border-b focus:border-b-gray-200"
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

        <button
          type="submit"
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-300  focus:outline-none transition"
        >
          Submit Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
