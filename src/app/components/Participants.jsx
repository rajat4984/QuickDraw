import { useGlobalContext } from "@/context";
import React from "react";
import { FaRegUser } from "react-icons/fa";
// import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const Participants = ({ setParticipantsOpen }) => {
  const { roomInfo } = useGlobalContext();

  return (
    <div className="w-[90vw] h-[80vh] shadow-2xl p-5 absolute top-0 bg-white z-10 flex flex-col">
      <div>
        <IoCloseOutline
          size={25}
          className="float-right m-1 mb-3 cursor-pointer"
          onClick={() => setParticipantsOpen(false)}
        />
      </div>
      {roomInfo?.participantsArray?.map((item) => (
        <div
          className="flex mb-3 items-center justify-between border-black border-2 p-3 rounded-xl"
          key={item._id}
        >
          <div className="flex items-center">
            <FaRegUser size={35} className="p-2" />
            <p>{item.userName}</p>
          </div>
          {/* <IoMdRemoveCircleOutline onClick={()=>handleKickOut()} size={35} className="p-2" /> */}
        </div>
      ))}
    </div>
  );
};

export default Participants;
