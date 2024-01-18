import useAppStore from "@/store/AppStore";
import React, { useCallback, useEffect, useState } from "react";
import Model from "./Model";
import { AnimatePresence } from "framer-motion";
import getAllUsers from "@/utils/getAllUsers";
import addTeammate from "@/utils/addTeammate";
import fetchUserData from "@/utils/fetchUserData";
import removeTeamMate from "@/utils/removeTeamMate";
import {
  Employee,
  TeamMember,
  UserData,
  UserReturnType,
} from "@/utils/app.types";

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
    console.log(data);
    setUsers(data);
  }, []);

  const onTeamMateAdd = useCallback(async (userToAddId: number) => {
    await addTeammate(teamId, userToAddId);
    const userData = await fetchUserData(userId);
    setUserData(userData!);
    getUsers();
    setSearchTerm("");
    setisModelOpen(false);
  }, []);

  const onTeamMateRemove = useCallback(async (userToRemove: number) => {
    const data = await removeTeamMate(teamId, userToRemove);
    const userData = await fetchUserData(userId);
    setUserData(userData!);
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex w-full h-full items-center gap-2 justify-center ">
      {teamMembers?.map(({ employee: { username, id } }) => (
        <div
          key={id}
          className="w-24 h-24  border border-gray-100 relative   bg-white rounded-full  flex-col  text-center flex items-center justify-center"
        >
          <span>{username} </span>
          <div
            onClick={() => onTeamMateRemove(id)}
            className="w-full h-full rounded-full absolute  flex items-center justify-center transition-all ease-in  opacity-0 hover:opacity-100 top-0 left-0  hover:bg-gray-50  "
          >
            X
          </div>
        </div>
      ))}
      <div
        onClick={onEmployeeAdd}
        className="w-24 h-24 bg-white border cursor-pointer border-gray-100 rounded-full flex items-center justify-center"
      >
        <span className=" text-gray-500 "> + </span>
      </div>

      <AnimatePresence>
        {isModelOpen && (
          <Model onClose={onEmployeeAdd}>
            <div>
              <div className=" w-full mx-auto mt-4 p-6 rounded-md">
                <div className="text-2xl font-bold mb-2  text-gray-600">
                  Add Teammates
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none focus:border-gray-500"
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
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

                <div className="mt-6 ">
                  <ul className="list-none">
                    {filteredUsers.length === 0 ? (
                      <li className="text-gray-500">
                        No matching users found.
                      </li>
                    ) : (
                      filteredUsers.map(({ id, username, email }) => (
                        <li
                          key={id}
                          className="text-gray-700 hover:bg-gray-50 rounded-md p-2 mb-4"
                        >
                          <div className="flex justify-between">
                            <div className="flex justify-between w-full">
                              <span>{username}</span>
                              <span> {email} </span>
                            </div>
                            <span
                              onClick={() => onTeamMateAdd(id)}
                              className="ml-2  cursor-pointer text-black"
                            >
                              +
                            </span>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </Model>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Team;
