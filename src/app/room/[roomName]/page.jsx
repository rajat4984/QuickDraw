"use client";
import React, { useEffect, useState } from "react";
import Chat from "./../../components/Chat";
import { MdCallEnd } from "react-icons/md";
import { MdChat } from "react-icons/md";
import { useGlobalContext } from "@/context";
import axios from "axios";
import { useRouter } from "next/navigation";
import Participants from "@/app/components/Participants";
import toast, { Toaster } from "react-hot-toast";
import Canvas from "@/app/components/Canvas";
import UserCanvas from "@/app/components/UserCanvas";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsThreeDotsVertical } from "react-icons/bs";
import Loading from "@/app/components/Loading";

const page = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const {
    setCurrentUserInfo,
    setRoomInfo,
    currentUserInfo,
    roomInfo,
    socketState,
    isPen,
    setIsPen,
  } = useGlobalContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const localRoomInfo = JSON.parse(sessionStorage.getItem("roomInfo"));
    const localCurrentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (localRoomInfo) {
      setRoomInfo({ ...localRoomInfo });
    }

    if (localCurrentUser) {
      setCurrentUserInfo({ ...localCurrentUser });
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (isPen) {
      toast("Pen mode", {
        style: { color: "#7E30E1" },
        icon: "🟣",
        duration: 800,
      });
    } else {
      toast("Eraser mode", {
        style: { color: "#7E30E1" },
        icon: "🟣",
        duration: 1000,
      });
    }
  }, [isPen]);

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
      toast.success(updatedRoomData.payload.notification);
      console.log(updatedRoomData, "updatedRoom");
      setRoomInfo({ ...updatedRoomData.payload.data });
      sessionStorage.setItem(
        "roomInfo",
        JSON.stringify({ ...updatedRoomData.payload.data })
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
    setLoading(true);
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
    }
    socketState?.disconnect();
    sessionStorage.clear();
    setRoomInfo({});
    setCurrentUserInfo({});
    setTimeout(() => {
      router.push(`/`);
      setLoading(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `RoomName: ${roomInfo.roomName}, RoomPassword: ${roomInfo.roomPassword}`
    );
    toast("Room Info copied", {
      style: { color: "#7E30E1" },
      icon: "🟣",
      duration: 800,
    });
  };

  return (
    <div>
      <Toaster />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-around m-2">
          {chatOpen ? (
            <>
              {/* CHAT */}
              <div>{chatOpen && <Chat setChatOpen={setChatOpen} />}</div>
            </>
          ) : (
            <div className="mx-3 flex items-center">
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {roomInfo?.roomOwner?.ownerId === currentUserInfo?.currentUserId && (
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setIsPen(!isPen);
                    }}
                  >
                    <p>{isPen ? "Pen" : "Eraser"}</p>
                  </MenuItem>
                )}

                <MenuItem onClick={handleClose}>
                  {" "}
                  <p
                    className="cursor-pointer"
                    onClick={() => setParticipantsOpen(!participantsOpen)}
                    size={25}
                  >
                    Participants
                  </p>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  {" "}
                  <p onClickCapture={copyToClipboard}>Copy Room info</p>
                </MenuItem>
              </Menu>
              {/* //WHITEBOARD */}
              <div className="cursor-[url('./eraser.png'), auto]">
                {/* ----------CANVAS------------- */}
                <div className={`relative `}>
                  {participantsOpen && (
                    <Participants setParticipantsOpen={setParticipantsOpen} />
                  )}

                  {roomInfo?.roomOwner?.ownerId ===
                  currentUserInfo?.currentUserId ? (
                    <Canvas />
                  ) : (
                    <UserCanvas />
                  )}
                </div>
                <div className="relative">
                  <div className="flex justify-evenly items-center mt-5 mx-8 md:justify-center">
                    <div></div>
                    <div className="bg-red-600 p-2 rounded-full shadow-xl md:ml-4">
                      <MdCallEnd
                        onClick={(e) => {
                          callEndHandler(e);
                          setIsPen("Pen");
                        }}
                        size={25}
                        className="text-white cursor-pointer"
                      />
                    </div>
                    <div
                      className="lg:hidden"
                      onClick={() => setChatOpen(true)}
                    >
                      <MdChat size={25} />
                    </div>
                    <div className="md:ml-4">
                      <BsThreeDotsVertical onClick={handleClick} />
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
      )}
    </div>
  );
};

export default page;
