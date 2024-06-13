"use client";

import React, { useState } from "react";

import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";

const Form = () => {

  const [showJoinForm,setShowJoinForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-center flex-col  absolute-center  text-center md:w-3/6 form-shadow px-5 p-10 rounded-xl">
      {
        showJoinForm ? (
          <JoinRoom setShowJoinForm={setShowJoinForm}/>
        ) : (
          <CreateRoom setShowJoinForm={setShowJoinForm}/>
        )
      }
 
      </div>
    </div>
  );
};

export default Form;
