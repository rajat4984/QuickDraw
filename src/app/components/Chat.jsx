"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useGlobalContext } from "@/context";
import axios from "axios";
import Message from "./Message";

const Chat = ({ setChatOpen }) => {
  const { roomInfo, currentUserInfo, setRoomInfo, socketState } =
    useGlobalContext();
  const [messageVal, setMessageVal] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    socketState?.on("messageReceived", ({ payload }) => {
      setRoomInfo({ ...payload.payload });
      sessionStorage.setItem(
        "roomInfo",
        JSON.stringify({ ...payload.payload })
      );
    });
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever roomInfo changes
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [roomInfo]);

  const sendMessage = async () => {
    const { data } = await axios.post(
      `http://localhost:5000/api/room/updateChat`,
      {
        message: messageVal,
        senderName: currentUserInfo.currentUserName,
        senderId: currentUserInfo.currentUserId,
        roomName: roomInfo.roomName,
      }
    );

    setRoomInfo({ ...data });
    setMessageVal("");
    sessionStorage.setItem("roomInfo", JSON.stringify({ ...data }));
    socketState?.emit("broadCast", {
      emitName: "messageReceived",
      payload: data,
    });
  };
  return (
    <>
      <div
        ref={chatContainerRef}
        className="relative md:w-1/2 lg:w-10/12 mx-auto my-0 border form-shadow rounded-xl h-[80vh] chat-scroll  flex flex-col overflow-y-scroll"
      >
        <div onClick={() => setChatOpen(false)} className="m-2 lg:hidden">
          <IoCloseOutline className="absolute right-[2%] top-[1%] w-5" />
        </div>
        {/* MESSAGES */}
        <div className="flex flex-col">
          {roomInfo?.chatRoomData?.map((messageObj) => {
            return <Message messageObj={messageObj} />;
          })}

          {/* MESSAGE INPUT */}
          <div>
            <div className="flex items-center p-2  justify-around fixed lg:static lg:w-full top-[88%] z-10 bg-[#fff] w-[94%] self-end md:w-[49%]">
              <input
                value={messageVal}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    sendMessage();
                  }
                }}
                onChange={(e) => setMessageVal(e.target.value)}
                placeholder="Enter your message"
                className="mt-5 mb-2 border rounded-md p-2  text-xs w-[80%]
               bg-[#7e30e142] placeholder-my_purple text-my_purple "
              />
              <button
                disabled={messageVal.length === 0}
                className={`bg-my_purple p-2 mt-2 rounded-full ml-1 ${
                  messageVal.length === 0 && "opacity-50"
                }`}
              >
                <IoSend className="text-[#FFF]" onClick={() => sendMessage()} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
