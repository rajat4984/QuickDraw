import { useGlobalContext } from "@/context";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateRoom = ({ setShowJoinForm }) => {
  const { setRoomInfo, setCurrentUserInfo } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  const createRoomHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    //create room
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/room/createRoom`,
      {
        userName: name,
      }
    );

    const localRoomInfo = {
      roomName: data.roomName,
      ownerDetails: [data.roomOwner],
    };

    const currentUserObj = {
      currentUserName: data.roomOwner.ownerName,
      currentUserId: data.roomOwner.ownerId,
    };

    setRoomInfo({ ...data });
    setCurrentUserInfo(currentUserObj);

    sessionStorage.setItem("roomInfo", JSON.stringify(data));
    sessionStorage.setItem("currentUser", JSON.stringify(currentUserObj));

    router.push(`/room/${data.roomName}`);
    setIsLoading(false);
  };
  return (
    <div>
      <h2 className="text-2xl text-my_purple">Create a room</h2>
      <form onSubmit={(e) => createRoomHandler(e)}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your name"
          className="mt-6 mb-2 border rounded-md p-3
         bg-[#7e30e142] placeholder-my_purple text-my_purple"
        />
        <br />
        <button
          type="submit"
          className={`${
            isLoading ? "bg-white" : "bg-my_purple"
          } mb-6 text-[#FFFF] px-3 py-2 rounded-md`}
        >
          {isLoading ? (
            <CircularProgress sx={{ color: "#7E30E1" }} />
          ) : (
            "Create a room"
          )}
        </button>
      </form>

      <p>or</p>
      <div
        onClick={() => setShowJoinForm(true)}
        className="text-my_purple cursor-pointer"
      >
        Join a room
      </div>
    </div>
  );
};

export default CreateRoom;
