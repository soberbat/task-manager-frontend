import { motion } from "framer-motion";
import React, { FC, ReactNode } from "react";

interface IModel {
  children: ReactNode;
  onClose: () => void;
}
const Model: FC<IModel> = ({ children, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="top-0 left-0 z-50 box-border fixed m-0 w-screen h-screen overflow-hidden "
    >
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="top-0 left-0 z-0 absolute bg-[#292f4c] opacity-[0.5] w-full h-full " />
        <div className="relative z-10 bg-[#191b34] shadow-lg rounded-[8px] w-[33%] h-[64%] ">
          <div
            className="top-1 right-3 absolute text-gray-500 cursor-pointer "
            onClick={onClose}
          >
            X
          </div>{" "}
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Model;
