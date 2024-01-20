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
      className="fixed top-0 z-50 left-0 w-screen h-screen   m-0 overflow-hidden     box-border "
    >
      <div className="relative w-full flex  items-center justify-center  h-full">
        <div className=" bg-black  w-full h-full absolute top-0 left-0   z-0   opacity-5 " />
        <div className="relative z-10 bg-white w-1/2 h-1/2   rounded-sm ">
          <div
            className="  text-gray-500  absolute  top-1 right-3 cursor-pointer"
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
