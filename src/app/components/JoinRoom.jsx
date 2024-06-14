import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const JoinRoom = ({ setShowJoinForm }) => {
  const [showPass, setShowPass] = useState(false);
 
  return (
    <div>
      <h2 className="text-2xl text-my_purple">Join a room</h2>
      <form onSubmit={(e)=>createRoomHandler(e)}>
        <input
          type="text"
          placeholder="Your name"
          required
          className="mt-6 mb-2 border rounded-md p-3
           bg-[#7e30e142] placeholder-my_purple text-my_purple"
        />
        <br/>
        <input
          type="text"
          placeholder="Room name"
          className=" mb-2 border rounded-md p-3
           bg-[#7e30e142] placeholder-my_purple text-my_purple"
        />

        <br />
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Room password"
            className="border mb-6 rounded-md p-3
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
      <div
        onClick={() => setShowJoinForm(false)}
        className="text-my_purple cursor-pointer"
      >
        Create a new room
      </div>
    </div>
  );
};

export default JoinRoom;