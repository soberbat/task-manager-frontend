import useAppStore from "@/store/AppStore";
import fetchUserData from "@/utils/fetchUserData";
import removeTask from "@/utils/removeTask";
import React, { useEffect } from "react";

const Home = () => {
  const { userData, setUserData, userId } = useAppStore();

  const handleTaskRemove = async (taskId: number) => {
    removeTask(taskId);
    const userData = await fetchUserData();
    setUserData(userData!);
  };

  return (
    <div className=" bg-white h-full  overflow-scroll  p-10">
      <div className="max-w-4xl   mx-auto ">
        <div className="flex mb-6 pb-5 text-black border-b-2  border-gray-100 items-start flex-col">
          <h1 className="text-2xl  font-medium">Home</h1>
          <span className="text-gray-500  font-normal text-lg">
            Tuesday, January 16
          </span>
        </div>
        <div>
          <h1 className="text-black mb-3   text-lg">My Tasks</h1>
          <div>
            {userData?.tasks.map(({ title, id }) => (
              <div
                key={id}
                className=" p-[.9vh] mb-2 flex justify-between  hover:bg-gray-50 rounded-lg"
              >
                <h1 className="  text-black ml-2"> {title} </h1>
                <span
                  onClick={() => handleTaskRemove(id)}
                  className=" text-gray-500"
                >
                  X
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
