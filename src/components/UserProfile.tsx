import React from "react";

interface IUserProfile {
  firstLetter: string | undefined;
  isSmallSize?: boolean;
}
const UserProfile = ({ firstLetter, isSmallSize }: IUserProfile) => {
  const size = isSmallSize ? "w-5 h-5" : "w-8 h-8";
  const textSize = isSmallSize ? "text-sm" : "text-2xl";
  return (
    <div
      className={`flex items-center justify-center bg-red-500 rounded-full ${size} ${textSize} font-bold text-[0.8rem]  text-white capitalize`}
    >
      {firstLetter}
    </div>
  );
};

export default UserProfile;
