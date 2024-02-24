import React, { useState } from "react";

const Tooltip = ({ children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const opacity = showTooltip ? 100 : 0;
  return (
    <div className="inline-block relative z-50">
      <div
        className={`bottom-[200%]   opacity-${opacity} left-1/2 z-10 absolute flex items-center justify-center bg-white p-4 rounded-sm w-[13vw] h-[3vh] text-gray-700 text-center text-xs transform transition-all -translate-x-1/2 duration-200  ease-in-out`}
      >
        {children}
        <div className="bottom-0 left-1/2 -z-20 absolute bg-white w-5 h-5 transform -translate-x-1/2 rotate-45"></div>
      </div>

      <div
        className="cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <img src="/info.svg" alt="" />
      </div>
    </div>
  );
};

export default Tooltip;
