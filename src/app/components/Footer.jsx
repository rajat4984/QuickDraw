import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-screen">
      <div className="bg-my_purple ">
        <p className="flex items-center justify-center text-[#FFFF] p-5">
          Made by Rajat <FaGithub />
        </p>
      </div>
    </div>
  );
};

export default Footer;
