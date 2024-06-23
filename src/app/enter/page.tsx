"use client";
import Login from "@/utils/login";
import SignUp from "@/utils/signUp";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, MouseEvent, Dispatch, FormEvent } from "react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userHasAccount, setUserHasAccount] = useState(false);

  const showNameInput = (label: string) => label === "Name" && userHasAccount;

  const inputFields = [
    { label: "Name", stateSetter: setUsername, type: "input" },
    { label: "E Mail", stateSetter: setEmail, type: "input" },
    { label: "Password", stateSetter: setPassword, type: "password" },
  ];

  const onSubmitButtonClick = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const response = userHasAccount
      ? await Login(email, password)
      : await SignUp(username, password, email);

    if (response.status === 201) {
      router.push("/");
    } else {
      setMessage(userHasAccount ? "Wrong Credentials" : "User Exists");
    }
  };

  const onInputChange = (
    e: FormEvent<HTMLInputElement>,
    stateSetter: Dispatch<React.SetStateAction<string>>
  ) => {
    stateSetter(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-white w-screen h-screen text-white">
      <div className="top-2 left-2 fixed flex mt-2 ml-2 w-full text-4xl">
        <img className="w-[2vw]" src="/logo2.png" alt="" />
      </div>

      <div className="box-border flex bg-white p-12 rounded-2xl w-4/6 h-4/6">
        <div className="flex-1">
          <form className="flex flex-col gap-6 p-10">
            <h1 className="font-medium text-3xl text-center text-indigo-950">
              Sign Up
            </h1>
            {inputFields.map(
              ({ label, stateSetter, type }) =>
                !showNameInput(label) && (
                  <div key={label} className=" ">
                    <input
                      type={type}
                      placeholder={label}
                      onInput={(e) => onInputChange(e, stateSetter)}
                      className="bg-gray-100 py-3 p-2 rounded-full w-full font-thin text-gray-700 indent-2 focus:outline-none"
                    />
                  </div>
                )
            )}

            <div className="flex flex-col justify-center items-center gap-4">
              <input
                className="bg-indigo-600 p-2 rounded-full w-full h-12 text-white cursor-pointer"
                type="submit"
                onClick={onSubmitButtonClick}
                value={userHasAccount ? "Login" : "Create Account"}
              />

              <span className="text-center text-red-500 text-xs">
                {" "}
                {message}
              </span>
            </div>

            <div className="p-2 border-t border-t-gray-100 text-center text-gray-400 text-xs">
              {userHasAccount ? "To Register" : "Have an account?"}
              <span
                onClick={() => {
                  setUserHasAccount(!userHasAccount);
                }}
                className="hover:text-gray-500 cursor-pointer"
              >
                {" "}
                Click here
              </span>

              <span className="block mt-2 text-xs">
                ** To test the app use{" "}
                <span className="font-bold"> test@user.com </span> as login
                email and <span className="font-bold"> 1234 </span> as the
                password if you do not wish to sign up with your own email
              </span>
            </div>
          </form>
        </div>
        <div className="flex flex-1 justify-center items-center pl-8 border-l border-l-gray-100">
          <img src="/background.png" alt="" />
        </div>
      </div>
    </div>
  );
}
