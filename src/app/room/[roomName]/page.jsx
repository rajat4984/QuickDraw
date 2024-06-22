"use client";
import React, { useEffect, useRef, useState } from "react";
import Chat from "./../../components/Chat";
import { MdCallEnd } from "react-icons/md";
import { io } from "socket.io-client";
import { FaRegUser } from "react-icons/fa";
import { MdChat } from "react-icons/md";
import { useGlobalContext } from "@/context";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const { setCurrentUserInfo, setRoomInfo, currentUserInfo, roomInfo } =
    useGlobalContext();
  const socketRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const localRoomInfo = JSON.parse(sessionStorage.getItem("roomInfo"));
    const localCurrentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (localRoomInfo) {
      setRoomInfo({ ...localRoomInfo });
    }

    if (localCurrentUser) {
      setCurrentUserInfo({ ...localCurrentUser });
    }
  }, []);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL);
    socketRef.current = socket;

    socket.on("connect", () => {
      //updating currentuser with their socket.id
      const localCurrentUser = JSON.parse(
        sessionStorage.getItem("currentUser")
      );
      if (!localCurrentUser.socketId) {
        setCurrentUserInfo((prev) => ({ ...prev, socketId: socket.id }));
        let currentUser = {
          ...localCurrentUser,
          socketId: socket.id,
        };
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
      }
    });

    socket.on("kickOut", () => {
      router.push("/roomEnd");
    });
  }, []);

  const callEndHandler = async (e) => {
    console.log(currentUserInfo,'currentUserinfo')
    const  currentUserId  = currentUserInfo.currentUserId;
    const { ownerId } = roomInfo.roomOwner;
    const { roomName } = roomInfo;
    if (currentUserId === ownerId) {
      try {
        console.log(roomName);
          await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/room/deleteRoom`,
          { params: { roomName } }
        );

        socketRef.current.emit("deleteRoom");

        router.push(`/joinRoom`);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/room/leaveRoom`,
        { participantId: currentUserId, roomName }
      );
      console.log('data',res);
      // setCurrentUserInfo({...})
    }
  };

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
                    <MdCallEnd
                      onClick={(e) => callEndHandler(e)}
                      size={25}
                      className="text-white"
                    />
                  </div>
                  <div className="lg:hidden" onClick={() => setChatOpen(true)}>
                    <MdChat size={25} />
                  </div>
                </div>
                <p className="hidden md:block absolute top-[0]">
                  {roomInfo?.ownerDetails &&
                    roomInfo?.ownerDetails[0].ownerName}
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
