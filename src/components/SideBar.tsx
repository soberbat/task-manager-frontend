import { motion } from "framer-motion";
import React, { useState } from "react";

const SideBar = () => {
  const [isBarVisible, setIsBarVisible] = useState(true);
  return (
    <motion.div
      onClick={() => setIsBarVisible(!isBarVisible)}
      animate={{ width: isBarVisible ? "20%" : "1%" }}
      className=" w-1/5   text-gray-400  border-gray-200 border border-t-0 bg-white  "
    ></motion.div>
  );
};

export default SideBar;
