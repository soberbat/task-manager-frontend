import useAppStore from "@/store/AppStore";
import { motion } from "framer-motion";
import React, { ChangeEvent, useState } from "react";
import ColoredCell from "./ColoredCell";
import converTime from "@/utils/converTime";
import UserProfile from "./UserProfile";
import getPriorityColor from "@/utils/getPriorityColor";
import Tooltip from "./Tooltip";
import PriorityUpdater from "./PriorityUpdater";
import StatusUpdater from "./StatusUpdater";
import UpdateTaskRow from "./UpdateTaskRow";
import OwnerUpdater from "./OwnerUpdater";
import fetchUserData from "@/utils/fetchUserData";
import updateTask, { TaskData } from "@/utils/updateTask";

const UpdateTask = () => {
  const {
    taskToUpdate,
    setIsUpdateTaskVisible,
    isUpdateTaskVisible,
    setUserData,
    setTaskToUpdate,
  } = useAppStore();

  const { priority, updatedAt, employee, completed, title, description } =
    taskToUpdate!;
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description!);

  const updateCurrentTask = async (data: TaskData) => {
    const updatedTask = await updateTask(data, taskToUpdate!.id);
    setTaskToUpdate(updatedTask);
    const userData = await fetchUserData();
    setUserData(userData);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTaskTitle(e.target.value);

  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setTaskDescription(e.target.value);

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ opacity: 0 }}
      className="top-0 right-0 absolute border-gray-400 bg-[#191b34] shadow-2xl p-8 border-l-8 w-[35vw] h-full text-[#d6d8df] origin-right"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative h-[95%]"
      >
        <img
          onClick={() => setIsUpdateTaskVisible(false)}
          className="cursor-pointer "
          src="/x-lg.svg"
          alt=""
        />
        <h1 className="border-[#292f4c] mt-4 pb-3 border-b-[1px] font-semibold text-2xl ">
          Edit Task Details
        </h1>

        <div className="mt-3">
          <div className="flex items-center">
            <img className="inline-block" src="/cursor.svg" alt="" />
            <h1 className="inline-block font-thin ">Details</h1>
          </div>
          <textarea
            onBlur={() => updateCurrentTask({ description: taskDescription })}
            value={taskDescription!}
            onChange={onTextAreaChange}
            className="focus:border-gray-500 focus:border-[0.3px] bg-[#33354b] hover:bg-[#404259] mt-2 hover:border hover:border-dotted rounded-sm w-full min-h-72 focus:outline-none indent-2"
          />
        </div>

        <UpdateTaskRow
          updateTask={updateCurrentTask}
          onChange={onInputChange}
          inputText={taskTitle}
          src={"cursor"}
        >
          Name
        </UpdateTaskRow>

        <UpdateTaskRow
          src={"person"}
          Updater={<OwnerUpdater updateTask={updateCurrentTask} />}
          taskRowInnerComponent={
            <UserProfile firstLetter={employee.username[0]} />
          }
        >
          Owner
        </UpdateTaskRow>

        <UpdateTaskRow
          src={"status"}
          Updater={<StatusUpdater updateTask={updateCurrentTask} />}
          taskRowInnerComponent={
            <ColoredCell color={completed ? "bg-green-500" : "bg-purple-400"}>
              {completed ? "Done" : "To Do"}
            </ColoredCell>
          }
        >
          Status
        </UpdateTaskRow>

        <UpdateTaskRow
          src={"status"}
          Updater={<PriorityUpdater updateTask={updateCurrentTask} />}
          taskRowInnerComponent={
            <ColoredCell color={getPriorityColor(priority)}>
              {priority}
            </ColoredCell>
          }
        >
          Priority
        </UpdateTaskRow>

        <UpdateTaskRow
          taskRowInnerComponent={
            <div className="flex items-center px-2 ">
              <UserProfile
                isSmallSize={true}
                firstLetter={employee.username[0]}
              />
              <h1 className="ml-3 ">{converTime(updatedAt)} </h1>
            </div>
          }
          src={"clock"}
        >
          Last Updated
        </UpdateTaskRow>
      </motion.div>
    </motion.div>
  );
};

export default UpdateTask;
