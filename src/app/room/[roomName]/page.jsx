"use client";
import React, { useEffect, useRef, useState } from "react";
import Chat from "./../../components/Chat";
import { MdCallEnd } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdChat } from "react-icons/md";
import { useGlobalContext } from "@/context";
import axios from "axios";
import { useRouter } from "next/navigation";
import Participants from "@/app/components/Participants";
import toast, { Toaster } from "react-hot-toast";
import Canvas from "@/app/components/Canvas";

const page = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const {
    setCurrentUserInfo,
    setRoomInfo,
    currentUserInfo,
    roomInfo,
    socketState,
  } = useGlobalContext();

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
    const handleConnect = () => {
      const localCurrentUser = JSON.parse(
        sessionStorage.getItem("currentUser")
      );
      if (!localCurrentUser.socketId) {
        setCurrentUserInfo((prev) => ({ ...prev, socketId: socketState?.id }));
        let currentUser = { ...localCurrentUser, socketId: socketState?.id };
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
      }
    };

    const handleKickOut = () => {
      router.push("/roomEnd");
    };

    const handleUpdateParticipants = (updatedRoomData) => {
      console.log(updatedRoomData, "updatedRoom");
      toast.success(updatedRoomData.payload.notification);
      setRoomInfo({ ...updatedRoomData.payload.data });
      sessionStorage.setItem(
        "roomInfo",
        JSON.stringify({ ...updatedRoomData.payload })
      );
    };

    socketState?.on("connect", handleConnect);
    socketState?.on("kickOut", handleKickOut);
    socketState?.on("updateParticipants", handleUpdateParticipants);

    return () => {
      socketState?.off("connect", handleConnect);
      socketState?.off("kickOut", handleKickOut);
      socketState?.off("updateParticipants", handleUpdateParticipants);
    };
  }, [socketState]);

  const callEndHandler = async (e) => {
    const currentUserId = currentUserInfo.currentUserId;
    const { ownerId } = roomInfo.roomOwner;
    const { roomName } = roomInfo;
    if (currentUserId === ownerId) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/room/deleteRoom`,
          { params: { roomName } }
        );
        socketState?.emit("broadCast", {
          emitName: "kickOut",
          payload: data,
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/room/leaveRoom`,
        { participantId: currentUserId, roomName }
      );

      socketState?.emit("broadCast", {
        emitName: "updateParticipants",
        data,
        notification: `${currentUserInfo?.currentUserName} left the room`,
      });
      // socketState?.emit("updateParticipants", data);
    }
    socketState?.disconnect();
    sessionStorage.clear();
    setRoomInfo({});
    setCurrentUserInfo({});
    router.push(`/joinRoom`);
  };

  return (
    <div>
      <Toaster />
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
              {/* ----------CANVAS------------- */}
              <div className="relative">
                {participantsOpen && <Participants />}

                <Canvas style={{ height: "80vh", width: "80vh" }} />
              </div>
              <div className="relative">
                <div className="flex justify-evenly items-center mt-5 mx-8 md:justify-center">
                  <div>
                    <FaRegUser
                      onClick={() => setParticipantsOpen(!participantsOpen)}
                      size={25}
                    />
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
