import React from "react";

const HomeHideCheckBox = () => {
  return (
    <div className="flex items-center ">
      <input
        id="default-checkbox"
        type="checkbox"
        value=""
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded appearance-none focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label className="ms-2 text-sm font-thin text-gray-90 0 dark:text-gray-300">
        Hide Finished Task
      </label>
    </div>
  );
};

export default HomeHideCheckBox;
