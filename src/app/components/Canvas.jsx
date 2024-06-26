import React, { useEffect, useRef, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef();
  const [canvasCtx, setCanvasCtx] = useState();
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    setCanvasCtx(ctx);

    if (window.innerWidth < 468) {
      canvas.width = window.innerWidth - 40;
    } else if (window.innerWidth > 468 && window.innerWidth < 1024) {
      canvas.width = window.innerWidth - 50;
    } else {
      canvas.width = window.innerWidth - 500;
    }

    canvas.height = window.innerHeight * 0.8;
  }, []);

  const getCoords = (e) => {
    const canvas = canvasRef.current;
    let x, y;

    if (e.touches && e.touches.length > 0) {
      x = e.touches[0].clientX - canvas.offsetLeft;
      y = e.touches[0].clientY - canvas.offsetTop;
    } else {
      x = e.clientX - canvas.offsetLeft;
      y = e.clientY - canvas.offsetTop;
    }

    return { x, y };
  };

  const start = (e) => {
    const canvas = canvasRef.current;
    setIsDrawing(true);

    const { x, y } = getCoords(e);
    canvasCtx.beginPath();
    canvasCtx.moveTo(x - canvas.offsetLeft, y - canvas.offsetTop);
    e.preventDefault();
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    const { x, y } = getCoords(e);
    if (isDrawing) {
      canvasCtx.lineTo(x - canvas.offsetLeft, y - canvas.offsetTop);
      canvasCtx.lineJoin = "round";
      canvasCtx.stroke();
    }

    e.preventDefault();
  };

  const stop = (e)=>{
    if(isDrawing){
      canvasCtx.stroke();
      canvasCtx.closePath();
      setIsDrawing(false);
    }

    e.preventDefault();
  }

  return (
    <div>
      <canvas
        onMouseDown={(e) => start(e)}
        onMouseMove={(e) => draw(e)}
        onTouchStart={(e) => start(e)}
        onTouchMove={(e) => draw(e)}
        onTouchEnd={(e)=>stop(e)}
        onMouseOut={(e)=>stop(e)}
        onMouseUp={(e)=>stop(e)}
        ref={canvasRef}
        id="myCanvas"
        className="rounded mt-3"
      ></canvas>
    </div>
  );
};

export default Canvas;
