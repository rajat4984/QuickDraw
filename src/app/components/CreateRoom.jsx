import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateRoom = ({ setShowJoinForm }) => {
  const [name, setName] = useState("");
  const router = useRouter();
  const createRoomHandler = async (e) => {
    e.preventDefault();
    
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/room/createRoom`, {
      userName: name,
    });
    const roomInfo = {
      roomName : data.roomName,
      roomOwner : data.roomOwner
    }

    localStorage.setItem('roomInfo',JSON.stringify(roomInfo));
    router.push(`/room/${data.roomName}`);
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
          className="bg-my_purple mb-6 text-[#FFFF] px-3 py-2 rounded-md"
        >
          Create a room
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
