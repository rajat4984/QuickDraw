// app/not-found.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-96">
        <h1 className="text-2xl">😭 Page not Found</h1>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
