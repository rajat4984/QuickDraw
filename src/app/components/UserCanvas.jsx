import { useGlobalContext } from "@/context";
import React, { useEffect, useRef, useState } from "react";

const UserCanvas = () => {
  const { socketState } = useGlobalContext();
  const userCanvasRef = useRef();
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    const userCanvas = userCanvasRef.current;
    const localCanvasImg = JSON.parse(sessionStorage.getItem("canvasImg"));
    const resizeCanvas = () => {
      if (window.innerWidth < 468) {
        userCanvas.width = window.innerWidth - 40;
      } else if (window.innerWidth > 468 && window.innerWidth < 1024) {
        userCanvas.width = window.innerWidth - 50;
      } else {
        userCanvas.width = window.innerWidth - 500;
      }
      userCanvas.height = window.innerHeight * 0.8;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (localCanvasImg) setImgSrc(localCanvasImg);

    const handleDraw = (boardData) => {
      setImgSrc(boardData.payload.data);
      sessionStorage.setItem(
        "canvasImg",
        JSON.stringify(boardData.payload.data)
      );
    };

    socketState?.on("draw", handleDraw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      socketState?.off("draw", handleDraw);
    };
  }, [socketState]);

  return (
    <div>
      <img
        ref={userCanvasRef}
        {...(imgSrc && { src: imgSrc })}
        className="rounded mt-3 userCanvas"
      />
    </div>
  );
};

export default UserCanvas;
