import useAppStore from "@/store/AppStore";
import React, { useCallback, useEffect, useState } from "react";
import Model from "./Model";
import { AnimatePresence } from "framer-motion";
import getAllUsers from "@/utils/getAllUsers";
import addTeammate from "@/utils/addTeammate";
import fetchUserData from "@/utils/fetchUserData";
import removeTeamMate from "@/utils/removeTeamMate";
import { UserReturnType } from "@/utils/app.types";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";

const Team = () => {
  const [isModelOpen, setisModelOpen] = useState(false);
  const [users, setUsers] = useState<UserReturnType[]>([]);
  const [searchTerm, setSearchTerm] = useState("xksfskfskfsk");
  const { userData, teamId, setUserData, userId } = useAppStore();
  const teamMembers = userData?.teams?.[0]?.team?.members;

  const filteredUsers =
    searchTerm === ""
      ? []
      : users?.filter(
          (user) =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
            user.teams[0]?.teamId !== teamId
        );

  const onEmployeeAdd = () => {
    setisModelOpen(!isModelOpen);
  };

  const getUsers = useCallback(async () => {
    const data = await getAllUsers();
    setUsers(data);
  }, []);

  const onTeamMateAdd = useCallback(async (userToAddId: number) => {
    await addTeammate(userToAddId);
    const userData = await fetchUserData();
    setUserData(userData!);
    getUsers();
    setSearchTerm("");
    setisModelOpen(false);
  }, []);

  const onTeamMateRemove = useCallback(async (userToRemove: number) => {
    const data = await removeTeamMate(teamId, userToRemove);
    const userData = await fetchUserData();
    setUserData(userData!);
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
    setSearchTerm("");
  }, []);

  return (
    <div className="w-full h-full font-thin ">
      <div className="border-[#292f4c] px-6 p-4 border-b-[2px] text-[#d6d8df] ">
        <h5>Hey, {userData?.username}!</h5>
        <h1 className="m-0 p-0 font-thin text-[#d6d8df] text-xl ">
          Collaborate with you friends from here!
        </h1>
      </div>

      <div className="px-6 p-4 w-full h-1/3 ">
        <div className="flex justify-center items-center gap-2 bg-[#292f4c] shadow-xl rounded-md w-[80%] h-full">
          {teamMembers?.map(({ employee: { username, id } }) => (
            <div
              key={id}
              className="inline-flex relative box-border items-center gap-1 bg-gray-200 p-[5px] rounded-full w-max text-black text-xs group"
            >
              <UserProfile firstLetter={username[0]} isSmallSize={true} />
              {username === userData?.username ? "You" : username}

              {username !== userData?.username && (
                <img
                  onClick={() => onTeamMateRemove(id)}
                  src="x-black.svg"
                  className="opacity-0 group-hover:opacity-100 ml-1 transition-all duration-300 cursor-pointer ease-out"
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative px-6 p-4">
        <div className="relative box-border flex flex-col bg-[#292f4c] shadow-xl p-4 rounded-md w-[80%] ">
          <span className="mb-2 pl-3 text-[#d6d8df] text-sm ">
            Invite with Email
          </span>

          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            isExpandable={false}
          />

          {searchTerm !== "" && (
            <div className="top-full left-0 absolute mt-6 rounded-md w-full h-[30vh] overflow-scroll ">
              <div className="bg-[#292f4c] shadow-xl rounded-md">
                {filteredUsers.length === 0 ? (
                  <div className="rounded-md text-gray-500">
                    No matching users found.
                  </div>
                ) : (
                  filteredUsers.map(({ id, username, email }) => (
                    <div
                      key={id}
                      className="hover:bg-[#31324f] mb-4 p-2 rounded-md text-[#d6d8df] text-sm "
                    >
                      <div className="flex justify-between">
                        <div className="flex justify-between items-center w-full">
                          <div className="inline-flex relative box-border justify-center items-center gap-2 p-[5px] rounded-full w-max text-[#d6d8df] group">
                            <UserProfile
                              firstLetter={username[0]}
                              isSmallSize={true}
                            />
                            {username}
                          </div>
                          <span>
                            {" "}
                            {email}
                            <span
                              onClick={() => onTeamMateAdd(id)}
                              className="ml-2 text-[#d6d8df] cursor-pointer"
                            >
                              +
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;

{
  /* <div className="flex justify-center items-center gap-2 w-full h-full ">
      {teamMembers?.map(({ employee: { username, id } }) => (
        <div
          key={id}
          className="relative flex flex-col justify-center items-center border-gray-100 border rounded-full w-24 h-24 text-black text-center"
        >
          <span className="break-words">{username} </span>
          <div
            onClick={() => onTeamMateRemove(id)}
            className="top-0 left-0 absolute flex justify-center items-center hover:bg-gray-50 opacity-0 hover:opacity-100 rounded-full w-full h-full transition-all ease-in"
          >
            X
          </div>
        </div>
      ))}
      <div
        onClick={onEmployeeAdd}
        className="flex justify-center items-center border-gray-100 bg-white border rounded-full w-24 h-24 cursor-pointer"
      >
        <span className="text-gray-500 "> + </span>
      </div>

      <AnimatePresence>
        {isModelOpen && (
          <Model onClose={onEmployeeAdd}>
            <div>
              <div className="mx-auto mt-4 p-6 rounded-md w-full h-[45vh] overflow-hidden ">
                <div className="mb-2 font-bold text-2xl text-gray-600">
                  Add Teammates
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="focus:border-gray-500 py-2 pr-4 pl-10 border rounded-md w-full text-black focus:outline-none"
                  />
                  <span className="left-0 absolute inset-y-0 flex items-center pl-3">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-5.2-5.2"
                      ></path>
                      <circle cx="10" cy="10" r="7"></circle>
                    </svg>
                  </span>
                </div>

                <div className="mt-6 w-full h-[50vh] overflow-scroll ">
                  <div className=" ">
                    {filteredUsers.length === 0 ? (
                      <div className="text-gray-500">
                        No matching users found.
                      </div>
                    ) : (
                      filteredUsers.map(({ id, username, email }) => (
                        <div
                          key={id}
                          className="hover:bg-gray-50 mb-4 p-2 rounded-md text-gray-700"
                        >
                          <div className="flex justify-between">
                            <div className="flex justify-between w-full">
                              <span>{username}</span>
                              <span> {email} </span>
                            </div>
                            <span
                              onClick={() => onTeamMateAdd(id)}
                              className="ml-2 text-black cursor-pointer"
                            >
                              +
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Model>
        )}
      </AnimatePresence>
    </div> */
}
