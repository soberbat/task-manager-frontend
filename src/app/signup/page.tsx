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
    <div className="bg-gray-50 text-black w-screen h-screen flex items-center justify-center">
      <img className=" h-full w-1/2 " src={imgSrc} alt="" />

      <div className="flex items-center flex-col justify-center w-1/2 ">
        <h1 className="text-5xl font-bold text-gray-500">Sign Up</h1>
        <form className="flex mt-10 w-1/2 flex-col gap-6">
          {inputFields.map(({ label, stateSetter, type }) => (
            <div key={label} className=" ">
              <span className="block  text-gray-500   mb-0">{label}</span>
              <input
                type={type}
                onInput={(e) => onInputChange(e, stateSetter)}
                className=" h-8 p-2 border border-gray-100  focus:outline-none w-full rounded-sm"
              />
            </div>
          ))}

          <div className="flex items-center gap-2 justify-center">
            <input
              className="bg-white rounded-sm h-9  w-1/3  "
              type="submit"
              onClick={onSignUp}
            />
          </div>
          {message}
        </form>

        <span className=" mt-6   text-gray-400 text-xs ">
          Have an account?
          <Link href={"/login"}>
            <span className=" hover:text-gray-500"> Click here </span>
          </Link>
        </span>
      </div>
    </div>
  );
}
