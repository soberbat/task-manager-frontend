import React from "react";
import withSlotUpdater from "./SlotUpdater";
import SlotUpdater from "./SlotUpdater";
import SearchBar from "./SearchBar";
import useAppStore from "@/store/AppStore";
import UserProfile from "./UserProfile";
import { TaskData } from "@/utils/updateTask";
import { Task } from "@/utils/app.types";

interface IOwnerUpdater {
  task?: Task;
  updateTask: (data: TaskData) => void;
}

const OwnerUpdater = ({ updateTask, task }: IOwnerUpdater) => {
  const { userData, taskToUpdate } = useAppStore();
  const teamMembers = userData?.teams?.[0]?.team?.members;
  const assignee = taskToUpdate?.employee.username;
  return (
    <SlotUpdater isLarge={true}>
      <div className="px-6 p-4 ">
        <div className="flex items-center mb-5 ">
          <h1 className="inline-block mr-3 font-bold text-gray-300">
            Assigned To
          </h1>
          <div className="inline-flex box-border items-center gap-1 bg-gray-200 p-[2px] rounded-full w-[35%] text-xs ">
            <UserProfile
              firstLetter={task ? task.employee.username[0] : assignee![0]}
              isSmallSize={true}
            />
            {task ? task.employee.username : assignee}
          </div>
        </div>
        <div className="flex justify-stretch items-center border border-blue-600 rounded-md w-full h-8">
          <SearchBar isExpandable={false} />
        </div>

        <div className="mt-4 text-gray-300 text-sm">
          <h1 className="mb-3 text-left ">Your Teammates</h1>
          <div className="h-12 overflow-scroll ">
            {teamMembers?.map(({ employee }, i) => (
              <div
                key={i}
                onClick={() => updateTask({ userId: employee.id })}
                className="box-border flex items-center gap-3 hover:bg-[#404259] p-2 rounded-md cursor-pointer "
              >
                <UserProfile
                  firstLetter={employee.username[0]}
                  isSmallSize={true}
                />
                {employee.email}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlotUpdater>
  );
};

export default OwnerUpdater;
