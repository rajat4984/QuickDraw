import { useGlobalContext } from "@/context";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const JoinRoom = ({ setShowJoinForm }) => {
  const { setRoomInfo, setCurrentUserInfo, socketState, currentUserInfo } =
    useGlobalContext();
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formState, setFormState] = useState({
    roomName: "",
    roomPassword: "",
    userName: "",
  });

  const formStateHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setFormState({ ...formState, [name]: value });
  };

  const joinRoomHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/room/joinRoom`,
        formState
      );
      setRoomInfo({ ...data });

      sessionStorage.setItem("canvasImg", JSON.stringify(data?.canvasImg));

      let currentUserObj = {
        currentUserName: data.participantsArray.slice(-1)[0].userName,
        currentUserId: data.participantsArray.slice(-1)[0]._id,
      };

      setCurrentUserInfo(currentUserObj);
      socketState?.emit("broadCast", {
        emitName: "updateParticipants",
        data,
        notification: `${currentUserObj.currentUserName} joined the room`,
      });
      console.log(data,'mydatainlogo');
      sessionStorage.setItem("roomInfo", JSON.stringify(data));
      sessionStorage.setItem("currentUser", JSON.stringify(currentUserObj));
      router.push(`/room/${data.roomName}`);

      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast.error(error.response.data.message, {
        style: { color: "#7E30E1" },
        icon: "🟣",
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };
  return (
    <div>
      <Toaster position="bottom-right" />
      <h2 className="text-2xl text-my_purple">Join a room</h2>
      <form onSubmit={(e) => joinRoomHandler(e)}>
        <input
          type="text"
          placeholder="Your name"
          value={formState.userName}
          onChange={(e) => formStateHandler(e)}
          required
          className="mt-6 mb-2 border rounded-md p-3
            bg-[#7e30e142] placeholder-my_purple text-my_purple"
          name="userName"
        />
        <br />

        <input
          type="text"
          value={formState?.roomName}
          required
          placeholder="Room name"
          className=" mb-2 border rounded-md p-3
            bg-[#7e30e142] placeholder-my_purple text-my_purple"
          name="roomName"
          onChange={(e) => formStateHandler(e)}
        />

        <br />
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            required
            placeholder="Room password"
            value={formState?.roomPassword}
            name="roomPassword"
            className="border mb-6 rounded-md p-3
            bg-[#7e30e142] placeholder-my_purple text-my_purple"
            onChange={(e) => formStateHandler(e)}
          />
          {showPass ? (
            <FaRegEye
              className="absolute top-[27%] right-[4%] text-my_purple cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            />
          ) : (
            <FaRegEyeSlash
              className="absolute top-[27%] right-[4%] text-my_purple cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            />
          )}
        </div>
        <button
          type="submit"
          className={`${
            isLoading ? "bg-white" : "bg-my_purple"
          } text-[#FFFF] px-3 py-2 rounded-md`}
        >
          {isLoading ? (
            <CircularProgress sx={{ color: "#7E30E1" }} />
          ) : (
            "Enter room"
          )}
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
