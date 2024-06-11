"use client";

import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const Form = () => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-center flex-col  absolute-center  text-center md:w-3/6 form-shadow px-5 p-10 rounded-xl">
        <h2 className="text-2xl text-my_purple">Join a room</h2>
        <form>
          <input
            type="text"
            placeholder="Room name"
            className="mt-5 mb-2 border rounded-md p-3
           bg-[#7e30e142] placeholder-my_purple text-my_purple"
          />
          <br />
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Room password"
              className="border mb-5 rounded-md p-3
           bg-[#7e30e142] placeholder-my_purple text-my_purple"
            />
            {showPass ? (
              <FaRegEye
                className="absolute top-[27%] right-[4%] text-my_purple"
                onClick={() => setShowPass(!showPass)}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute top-[27%] right-[4%] text-my_purple"
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-my_purple text-[#FFFF] px-3 py-2 rounded-md"
          >
            Enter Room
          </button>
        </form>

        <p>or</p>
        <div className="text-my_purple">Create a new room</div>
      </div>
    </div>
  );
};

export default Form;
