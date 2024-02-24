import useAppStore from "@/store/AppStore";
import { motion } from "framer-motion";
import React from "react";

const Navigation = () => {
  const { setActiveTab, activeTab } = useAppStore();
  const tabs = ["Home", "Projects", "Team"];
  return (
    <div className="flex items-center rounded-full  relative  w-[30%]   bg-[#191b34]">
      {tabs.map((tab, i) => {
        const isActive = activeTab === i;
        return (
          <motion.div
            onClick={() => setActiveTab(i)}
            key={i}
            className="  relative  flex-1    flex  items-center justify-center  p-[0.6rem]   font-extrabold  text-[0.8rem]  "
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
                className="absolute block p-[0.6rem]   z-0 h-full bg-[#4c4e69]   top-0 rounded-full   w-full"
              ></motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Navigation;
