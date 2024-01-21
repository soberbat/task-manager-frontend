"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, MouseEvent, Dispatch, FormEvent } from "react";
import Login from "@/utils/login";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const inputFields = [
    { label: "Email", stateSetter: setEmail, type: "input" },
    { label: "Password", stateSetter: setPassword, type: "password" },
  ];

  const onLogin = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const response = await Login(email, password);

    if (response.status === 201) {
      router.push("/");
    } else {
      setMessage("Wrong Creds");
    }
  };

  const onInputChange = (
    e: FormEvent<HTMLInputElement>,
    stateSetter: Dispatch<React.SetStateAction<string>>
  ) => {
    stateSetter(e.currentTarget.value);
  };

  return (
    <div className="bg-gray-50 text-black w-screen h-screen  flex items-center justify-between">
      <img className=" h-full w-1/2 " src="/bg.jpg" alt="" />

      <div className="flex items-center justify-center w-1/2 ">
        <form className="flex mt-10 w-1/2  flex-col    gap-6">
          <h1 className="text-5xl font-bold text-center text-gray-500">
            Log In
          </h1>
          {inputFields.map(({ label, stateSetter, type }) => (
            <div key={label} className=" ">
              <span className="block  text-gray-500 mb-0">{label}</span>
              <input
                type={type}
                onInput={(e) => onInputChange(e, stateSetter)}
                className=" h-8 p-2   focus:outline-none w-full rounded-sm"
              />
            </div>
          ))}

          <div className="flex items-center gap-2 justify-center">
            <input
              className="bg-white rounded-sm h-9  w-1/3  "
              type="submit"
              onClick={onLogin}
            />
          </div>
          {message}
        </form>
      </div>
    </div>
  );
}
