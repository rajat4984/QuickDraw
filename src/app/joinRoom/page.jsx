"use client";
import React, { useEffect } from "react";
import Form from "../components/Form";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useGlobalContext } from "@/context";

const page = () => {
  const {socketRef} = useGlobalContext()

  return (
    <div className="min-h-max">
      <Navbar />
      <Form />
      <Footer />
    </div>
  );
};

export default page;
