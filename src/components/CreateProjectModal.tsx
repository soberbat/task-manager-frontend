import useAppStore from "@/store/AppStore";
import addProject from "@/utils/addProject";
import fetchUserData from "@/utils/fetchUserData";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface ICreateProjectModal {
  setisModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProjectModal = ({ setisModelOpen }: ICreateProjectModal) => {
  const { setUserData } = useAppStore();

  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addProject(data);
    const userData = await fetchUserData();
    setUserData(userData!);
    setisModelOpen(false);
  };

  return (
    <div className="p-8 rounded">
      <h2 className="text-2xl font-semibold mb-4">Create Project</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-gray-300 text-white px-4 py-2 block rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300 transition"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProjectModal;
