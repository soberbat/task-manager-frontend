import React from "react";

interface IColoredCell {
  color: string;
  children: React.ReactNode;
}

const ColoredCell = ({ color, children }: IColoredCell) => {
  return (
    <h1
      className={` h-full flex select-none  items-center justify-center text-center capitalize ${color} w-full  border-gray-600`}
    >
      {children}
    </h1>
  );
};

export default ColoredCell;
