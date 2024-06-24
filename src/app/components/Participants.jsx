import { useGlobalContext } from "@/context";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const Participants = () => {
  const { roomInfo } = useGlobalContext();
  console.log(roomInfo, "roomIfno");
  return (
    <div className="w-[90vw] h-[80vh] shadow-2xl p-5 absolute top-0">
      {roomInfo?.participantsArray?.map((item) => (
        <div
          className="flex items-center justify-between border-black border-2 p-3 rounded-xl"
          key={item._id}
        >
          <div className="flex items-center">
            <FaRegUser size={35} className="p-2" />
            <p>{item.userName}</p>
          </div>
          <IoMdRemoveCircleOutline size={35} className="p-2" />
        </div>
      ))}
    </div>
  );
};

export default Participants;
