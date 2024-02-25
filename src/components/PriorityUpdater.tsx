import React from "react";
import withSlotUpdater from "./SlotUpdater";
import SlotUpdater from "./SlotUpdater";
import useAppStore from "@/store/AppStore";
import { TaskData } from "@/utils/updateTask";

interface IPriorityUpdater {
  updateTask: (data: TaskData) => void;
}

const PriorityUpdater = ({ updateTask }: IPriorityUpdater) => {
  return (
    <SlotUpdater>
      <div className="relative flex flex-col justify-center items-center gap-2 px-6 p-4 w-full h-full text-white">
        <div
          onClick={() => updateTask({ priority: "high" })}
          className="flex justify-center items-center bg-red-500 hover:bg-red-600 w-full h-7"
        >
          High
        </div>
        <div
          onClick={() => updateTask({ priority: "medium" })}
          className="flex justify-center items-center bg-yellow-500 hover:bg-yellow-600 w-full h-7"
        >
          Medium
        </div>
        <div
          onClick={() => updateTask({ priority: "low" })}
          className="flex justify-center items-center bg-green-500 hover:bg-green-600 w-full h-7"
        >
          Low
        </div>
      </div>
    </SlotUpdater>
  );
};

export default PriorityUpdater;
