import { useGlobalContext } from "@/context";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Canvas = () => {
  const { socketState, roomInfo, isPen } = useGlobalContext();
  const canvasRef = useRef();
  const [canvasCtx, setCanvasCtx] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPostTime, setLastPostTime] = useState(0);
  const eraserRadius = 8;

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (window.innerWidth < 468) {
      canvas.width = window.innerWidth - 40;
    } else if (window.innerWidth > 468 && window.innerWidth < 1024) {
      canvas.width = window.innerWidth - 50;
    } else {
      canvas.width = window.innerWidth - 500;
    }
    canvas.height = window.innerHeight * 0.8;

  };

  useEffect(() => {
    resizeCanvas();
    const localCanvasImg = JSON.parse(sessionStorage.getItem("canvasImg"));

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    setCanvasCtx(ctx);

    if (localCanvasImg) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = localCanvasImg;
    }

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const getCoords = (e) => {
    const canvas = canvasRef.current;
    let x, y;

    if (e.touches && e.touches.length > 0) {
      x = e.touches[0].clientX - canvas.offsetLeft - 20;
      y = e.touches[0].clientY - canvas.offsetTop - 20;
    } else {
      x = e.clientX - canvas.offsetLeft - 20;
      y = e.clientY - canvas.offsetTop - 20;
    }

    return { x, y };
  };

  const start = (e) => {
    const { x, y } = getCoords(e);
    setIsDrawing(true);
    canvasCtx.beginPath();
    canvasCtx.moveTo(x, y);
    // e.preventDefault();
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;

    const { x, y } = getCoords(e);
    if (isPen) {
      canvasCtx.globalCompositeOperation = "source-over";
      canvasCtx.lineTo(x, y);
      canvasCtx.stroke();
    } else {
      canvasCtx.globalCompositeOperation = "destination-out";
      canvasCtx.lineTo(x, y);
      canvasCtx.strokeStyle = "rgba(0,0,0,1)"; // Adjust as needed
      canvasCtx.lineWidth = eraserRadius * 3;
      canvasCtx.stroke();
      canvasCtx.strokeStyle = "black"; // Reset to pen color
      canvasCtx.lineWidth = 2;
    }

    socketState?.emit("broadCast", {
      emitName: "draw",
      data: canvas.toDataURL(),
    });

    sessionStorage.setItem(
      "canvasImg",
      JSON.stringify(canvasRef.current.toDataURL())
    );
    e.preventDefault();
  };

  const stop = (e) => {
    if (!isDrawing) return;

    canvasCtx.closePath();
    setIsDrawing(false);

    const currentTime = Date.now();
    if (currentTime - lastPostTime >= 3000) {
      setLastPostTime(currentTime);
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/room/updateCanvas`, {
        roomName: roomInfo.roomName,
        canvasImg: canvasRef.current.toDataURL(),
      });
    }
    e.preventDefault();
  };

  return (
    <div>
      <canvas
        onMouseDown={start}
        onMouseMove={draw}
        onMouseUp={stop}
        onMouseOut={stop}
        onTouchStart={start}
        onTouchMove={draw}
        onTouchEnd={stop}
        ref={canvasRef}
        id="myCanvas"
        className="rounded mt-3 object-contain"
      ></canvas>
    </div>
  );
};

export default Canvas;
