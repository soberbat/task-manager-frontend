import React from "react";

interface IButtonWithChevron {
  children: React.ReactNode;
  onClick: () => void;
}

const ButtonWithChevron = ({ children, onClick }: IButtonWithChevron) => {
  return (
    <div
      onClick={onClick}
      className="inline-block flex items-center bg-blue-600 rounded-[3px] w-[9%] h-full font-thin "
    >
      <span className="flex flex-1 justify-center items-center border-gray-800 px-1 border-r h-full text-sm cursor-pointer ">
        {children}
      </span>
      <img
        className="flex-[0.2] p-1 w-1 h-full rotate-90"
        src="/chevron.svg"
        alt=""
      />
    </div>
  );
};

export default ButtonWithChevron;
