import React from "react";

const CreateRoom = ({setShowJoinForm}) => {

  return (
    <div>
      <h2 className="text-2xl text-my_purple">Create a room</h2>
      <form>
        <input
          type="text"
          placeholder="Enter your name"
          className="mt-5 mb-2 border rounded-md p-3
         bg-[#7e30e142] placeholder-my_purple text-my_purple"
        />
        <br />
        <button
          type="submit"
          className="bg-my_purple text-[#FFFF] px-3 py-2 rounded-md"
        >
          Create a room
        </button>
      </form>

      <p>or</p>
      <div onClick={()=>setShowJoinForm(true)} className="text-my_purple">Join a room</div>
    </div>
  );
};

export default CreateRoom;
