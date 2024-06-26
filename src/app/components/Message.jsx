import { useGlobalContext } from "@/context";
import React from "react";

const Message = ({ messageObj }) => {
  const { currentUserInfo } = useGlobalContext();
  console.log( currentUserInfo?.currentUserId)
  return (
    <div
      className={
        currentUserInfo?.currentUserId === messageObj.senderId ? "self-end" : ""
      }
    >
      <div className="border rounded-lg p-2 max-w-52 text-xs mx-4 my-3">
        <p className="font-bold">{messageObj?.senderName}</p>
        <p className="">{messageObj?.message}</p>
      </div>
    </div>
  );
};

export default Message;
