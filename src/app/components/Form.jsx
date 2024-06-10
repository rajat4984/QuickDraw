import React from "react";

const Form = () => {
  return (
    <div>
      <div className="flex items-center justify-center flex-col  absolute-center  text-center md:w-3/6 form-shadow px-5 p-10 rounded-xl">
        <h2 className="text-2xl text-my_purple">Join a room</h2>
        <form>
          <input type="text" placeholder="paste room url to join" className="my-8 border rounded-md p-3
           bg-[#7e30e142] placeholder-my_purple text-my_purple" />
          <br />
          <button
            type="submit"
            className="bg-my_purple text-[#FFFF] px-3 py-2 rounded-md"
          >
            Enter Room
          </button>
        </form>

        <p>or</p>
        <div className="text-my_purple">Create a new room</div>
      </div>
    </div>
  );
};

export default Form;
