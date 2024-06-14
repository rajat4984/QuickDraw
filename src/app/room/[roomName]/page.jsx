"use client";
import React, { useState } from "react";
import Chat from "./../../components/Chat";
import { MdCallEnd } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdChat } from "react-icons/md";

const page = () => {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <div>
      <div className="flex flex-col justify-around m-2">
        {chatOpen ? (
          <>
            {/* CHAT */}
            <div>{chatOpen && <Chat setChatOpen={setChatOpen} />}</div>
          </>
        ) : (
          <div className="mx-3 flex items-center">
            {/* //WHITEBOARD */}
            <div>
              <canvas id="myCanvas" className="rounded mt-3"></canvas>

              <div className="relative">
                <div className="flex justify-evenly items-center mt-5 mx-8 md:justify-center">
                  <div>
                    <FaRegUser size={25} />
                  </div>
                  <div className="bg-red-600 p-2 rounded-full shadow-xl md:ml-4">
                    <MdCallEnd size={25} className="text-white" />
                  </div>
                  <div className="lg:hidden" onClick={() => setChatOpen(true)}>
                    <MdChat size={25} />
                  </div>
                </div>
                <p className="hidden md:block absolute top-[0]">Rajat</p>
              </div>
            </div>

            <div className="hidden lg:block mt-2 self-baseline w-[40%]">
              <Chat />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
