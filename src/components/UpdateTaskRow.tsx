import { AnimatePresence } from "framer-motion";
import { useState } from "react";

interface IUpdateTaskRow {
  children?;
  src?;
  taskRowInnerComponent?;
  inputText?;
  Updater?;
  onChange?;
  updateTask?;
}

const UpdateTaskRow = ({
  children,
  src,
  taskRowInnerComponent,
  inputText,
  Updater,
  onChange,
  updateTask,
}: IUpdateTaskRow) => {
  const [isUpdaterVisible, setisUpdaterVisible] = useState(false);

  const onClick = () => {
    setisUpdaterVisible(!isUpdaterVisible);
  };

  return (
    <div className="flex items-center mt-4 h-[4.5vh] font-thin text-sm cursor-pointer ">
      <div className="flex-[0.4]">
        <img className="inline-block mr-3" src={`/${src}.svg`} alt="" />
        {children}
      </div>

      {inputText || onChange ? (
        <input
          value={inputText}
          onChange={onChange}
          onBlur={() => updateTask({ title: inputText })}
          className="flex-[0.6] focus:border-gray-500 focus:border-[0.3px] bg-[#33354b] hover:bg-[#404259] hover:border hover:border-dotted rounded-sm h-full indent-2 focus:outline-none"
        />
      ) : (
        <div
          onClick={onClick}
          className="relative flex flex-[0.6] justify-center items-center bg-[#33354b] hover:bg-[#404259] rounded-sm h-full text-center "
        >
          {taskRowInnerComponent}
          <AnimatePresence>{isUpdaterVisible && Updater}</AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default UpdateTaskRow;
