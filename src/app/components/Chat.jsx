"use client";

import React from "react";
import { IoSend } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import Message from "./Message";

const Chat = ({ setChatOpen }) => {
  return (
    <>
      <div className="relative md:w-1/2 lg:w-10/12 mx-auto my-0 border form-shadow rounded-xl h-[80vh] chat-scroll  flex flex-col overflow-y-scroll">
        <div onClick={() => setChatOpen(false)} className="m-2 lg:hidden">
          <IoCloseOutline className="absolute right-[2%] top-[1%] w-5" />
        </div>
        {/* MESSAGES */}
        <div className="flex flex-col">
          <div>
            <Message />
          </div>
          <div className="self-end">
            <Message />
          </div>
          <div>
            <Message />
          </div>
          <div>
            <Message />
          </div>

          {/* MESSAGE INPUT */}
          <div>
            <div className="flex items-center p-2  justify-around fixed lg:static lg:w-full top-[88%] z-10 bg-[#fff] w-[94%] self-end md:w-[49%]">
              <input
                placeholder="Enter your message"
                className="mt-5 mb-2 border rounded-md p-2  text-xs w-[80%]
           bg-[#7e30e142] placeholder-my_purple text-my_purple "
              />
              <button className="bg-my_purple p-2 mt-2 rounded-full ml-1">
                <IoSend className="text-[#FFF]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
