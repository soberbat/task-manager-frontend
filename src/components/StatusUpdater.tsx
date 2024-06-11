import React from "react";
import SlotUpdater from "./SlotUpdater";
import { TaskData } from "@/utils/updateTask";

interface IOwnerUpdater {
  updateTask: (data: TaskData) => void;
}

const StatusUpdater = ({ updateTask }: IOwnerUpdater) => {
  return (
    <SlotUpdater>
      <div className="px-6 p-4 text-white ">
        <div
          onClick={() => updateTask({ completed: false })}
          className="flex justify-center items-center bg-purple-400 hover:bg-purple-500 mb-2 w-full h-7"
        >
          To Do
        </div>
        <div
          onClick={() => updateTask({ completed: true })}
          className="flex justify-center items-center bg-green-500 hover:bg-green-600 w-full h-7"
        >
          Done
        </div>
      </div>
    </SlotUpdater>
  );
};

export default StatusUpdater;
