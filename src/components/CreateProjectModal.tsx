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
    <div className="p-8 h-full font-thin rounded">
      <h2 className="mb-4 font-semibold text-[#d6d8df] text-2xl">
        Create Project
      </h2>

      <form className="flex flex-col h-[90%] " onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-thin text-[#d6d8df] text-sm">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="bg-[#292f4c] mt-1 p-2 border-[.2px] border-gray-600 rounded-md w-full focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block font-thin text-[#d6d8df] text-sm">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="bg-[#292f4c] mt-1 p-2 border-[.2px] border-gray-600 rounded-md w-full focus:outline-none"
          ></textarea>
        </div>

        <div className="mt-auto text-sm self-end">
          <span>Cancel</span>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 ml-3 px-4 py-2 rounded-md text-white focus:outline-none"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectModal;
