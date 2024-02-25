import { motion } from "framer-motion";

interface ISlotUpdater {
  children: React.ReactNode;
  isLarge?: boolean;
}
const SlotUpdater = ({ children, isLarge = false }: ISlotUpdater) => {
  const width = isLarge ? "w-[22vw]" : "w-[12vw]";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`bottom-[120%]   shadow-xl opacity-${1} left-1/2 z-10 absolute  origin-bottom  bg-[#292f4c]  rounded-[5px] ${width} text-gray-700 text-center text-xs transform transition-all -translate-x-1/2 duration-200  ease-in-out`}
    >
      {children}
      <span className="block bottom-0 left-1/2 -z-40 absolute bg-[#292f4c] opacity-100 w-[1.5vw] text-[#292f4c] text-opacity-0 transform -translate-x-1/2 rotate-45">
        a
      </span>
    </motion.div>
  );
};

export default SlotUpdater;
