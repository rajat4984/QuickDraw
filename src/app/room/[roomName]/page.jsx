"use client";
import React, { useEffect, useRef, useState } from "react";
import Chat from "./../../components/Chat";
import { MdCallEnd } from "react-icons/md";
import { io } from "socket.io-client";
import { FaRegUser } from "react-icons/fa";
import { MdChat } from "react-icons/md";
import { useGlobalContext } from "@/context";

const page = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const { setCurrentUser, currentUser } = useGlobalContext();
  const socketRef = useRef();
  const [roomInfo, setRoomInfo] = useState(
    JSON.parse(sessionStorage.getItem("roomInfo"))
  );
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL);
    socketRef.current = socket;

    console.log( JSON.parse(sessionStorage.getItem("currentUser")),'sdoifj')
    socket.on("connect", () => {
      //updating currentuser with their socket.id
      const localCurrentUser = JSON.parse(
        sessionStorage.getItem("currentUser")
      );
      if (!localCurrentUser.socketId) {
        setCurrentUser((prev) => ({ ...prev, socketId: socket.id }));
        let currentUser = {
          currentUser: JSON.parse(sessionStorage.getItem("currentUser")),
          socketId: socket.id,
        };
        console.log(currentUser, "current");
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
      }
    });

    // const currentUser = sessionStorage.getItem(JSON.parse("currentUser"));
    // console.log(storedUser, "storedUser");

    //events
    // socket.on("newUserConnected", (userData) => {
    //   if (!currentUser) {
    //     let currentUser = {
    //       currentUserName :
    //     }
    //     sessionStorage.setItem("userName", userData.userName);
    //     sessionStorage.setItem("userId", userData.userId);
    //     setCurrentUserInfo({ ...userData });
    //     socket.emit("userEnteredInChat",userData);
    //   } else {
    //     setCurrentUserInfo({
    //       userName: sessionStorage.getItem("userName", userData.userName),
    //       userId: sessionStorage.getItem("userId", userData.userId),
    //     });
    //   }
    // });
  }, []);
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
                <p className="hidden md:block absolute top-[0]">
                  {roomInfo?.roomOwner}
                </p>
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
