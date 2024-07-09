import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <CircularProgress size={70} sx={{ color: "#7E30E1" }} />
    </div>
  );
};

export default Loading;
