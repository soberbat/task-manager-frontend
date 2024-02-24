import { UserData } from "@/utils/app.types";
import React from "react";
import Task from "./Task";

interface ITaskTable {
  userData: UserData | null;
}

const TaskTable = ({ userData }: ITaskTable) => {
  return (
    <div className="p-6">
      {!(userData?.tasks.length < 1) ? (
        <div className="flex mb-2 w-full font-thin text-[#d6d8df] text-sm ">
          <h1 className="flex-[0.9] text-center"></h1>
          <h1 className="flex-[0.5] text-center"> Details </h1>
          <h1 className="flex-[0.2] text-center"> Assignee </h1>
          <h1 className="flex-[0.2] text-center"> Priority </h1>
        </div>
      ) : (
        <h1 className="text-2xl text-gray-600">You don't have any tasks</h1>
      )}
      <div className="bg-[#292f4c] border-l-[5px] border-l-blue-500 rounded-l-md ">
        {userData?.tasks.map((task, i) => (
          <Task key={i} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskTable;
