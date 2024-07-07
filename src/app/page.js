"use client";
import React from "react";
import Form from "./components/Form";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const page = () => {
  return (
    <div className="min-h-max">
      <Navbar />
      <Form />
      <Footer />
    </div>
  );
};

export default page;
