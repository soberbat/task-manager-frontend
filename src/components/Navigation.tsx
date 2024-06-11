import useAppStore from "@/store/AppStore";
import { motion } from "framer-motion";
import React from "react";

const Navigation = () => {
  const { setActiveTab, activeTab, setIsUpdateTaskVisible } = useAppStore();
  const tabs = ["Home", "Projects", "Team"];
  return (
    <div className="relative flex items-center bg-[#191b34] rounded-full w-[30%]">
      {tabs.map((tab, i) => {
        const isActive = activeTab === i;
        return (
          <motion.div
            onClick={() => setActiveTab(i)}
            key={i}
            className="relative flex flex-1 justify-center items-center p-[0.6rem] font-extrabold text-[0.8rem] "
          >
            <div
              className={` relative   z-10 text-${
                isActive ? "white" : ["#d6d8df"]
              }  `}
            >
              {" "}
              {tab}
            </div>

            {isActive && (
              <motion.div
                layoutId="underline"
                transition={{
                  layout: { duration: 0.3 },
                }}
                className="block top-0 z-0 absolute bg-[#4c4e69] p-[0.6rem] rounded-full w-full h-full"
              ></motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Navigation;
