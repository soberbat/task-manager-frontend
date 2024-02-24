"use client";
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

  const inputFields = [
    { label: "Name", stateSetter: setUsername, type: "input" },
    { label: "Password", stateSetter: setPassword, type: "password" },
    { label: "E Mail", stateSetter: setEmail, type: "input" },
  ];

  const onSignUp = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const response = await SignUp(username, password, email);

    if (response.status === 201) {
      router.push("/");
    } else {
      setMessage(message);
    }
  };

  const onInputChange = (
    e: FormEvent<HTMLInputElement>,
    stateSetter: Dispatch<React.SetStateAction<string>>
  ) => {
    stateSetter(e.currentTarget.value);
  };

  const imgSrc =
    "https://images.unsplash.com/photo-1705783679154-c47fab616434?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="  bg-indigo-950  text-white w-screen h-screen flex gap-4 items-center flex-col justify-center">
      <div className="fixed text-4xl flex items-center justify-center   top-8 ">
        <img className="w-[15vw]" src="/logo.png" alt="" />
      </div>

      <div className=" w-4/6 h-4/6 bg-white  p-12 box-border  flex  rounded-2xl ">
        <div className=" flex-1 ">
          <form className="flex   p-10 flex-col gap-6">
            <h1 className="text-3xl  text-center  font-medium text-indigo-950">
              Sign Up
            </h1>
            {inputFields.map(({ label, stateSetter, type }) => (
              <div key={label} className=" ">
                {/* <span className="block  text-gray-500   mb-0">{label}</span> */}
                <input
                  type={type}
                  onInput={(e) => onInputChange(e, stateSetter)}
                  className="  h-12 p-2    bg-gray-100 focus:outline-none w-full rounded-full"
                />
              </div>
            ))}

            <div className="flex  items-center gap-2 justify-center">
              <input
                className=" w-full rounded-full cursor-pointer  text-white  bg-indigo-600 h-12 p-2 text-black    "
                type="submit"
                onClick={onSignUp}
                value={"Create Account"}
              />
            </div>
            {message}

            <div className=" p-2 text-center   border-t border-t-gray-100  text-gray-400 text-xs ">
              Have an account?
              <span className=" cursor-pointer hover:text-gray-500">
                {" "}
                Click here
              </span>
            </div>
          </form>
        </div>
        <div className=" flex-1   border-l-gray-100 border-l  flex items-center justify-center pl-8 ">
          <img src="/background.png" alt="" />
        </div>
      </div>
    </div>
  );
}
