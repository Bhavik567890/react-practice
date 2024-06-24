import { useRef, useEffect, useState, useCallback } from "react";
import "../../css/scratch-card.css";
import { RevealResults } from "../../services/scratch-service/scratch-service";

export const ScratchCard = () => {
  const [isScratched, setIsScratched] = useState(false);
  const [result, setResult] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    console.log(ctx, 13);
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener("mousedown", handleMouseDown);
  }, [canvasRef, handleMouseDown]);

  const handleMouseDown = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientx - rect.left;
      const y = e.clientY - rect.top;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2, false);

      ctx.fill();
    };
    const handleMouseUp = () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      checkScratchCompletion();
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
  }, [checkScratchCompletion]);

  const checkScratchCompletion = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const totalPixels = imageData.data.length / 4;
    let scratchedPixels = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] === 0) {
        scratchedPixels++;
      }
    }
    if (scratchedPixels / totalPixels > 0.5) {
      revealResult();
    }
  }, []);

  const revealResult = async () => {
    try {
      const result = await RevealResults();

      setResult(result?.result);
      setIsScratched(true);
    } catch (error) {
      console.error("Error scratching card", error);
    }
  };

  return (
    <div className="scratch-card-container">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="scratch-card-canvas"
      />
      {isScratched && (
        <div className="result">
          <h2>{result}</h2>
        </div>
      )}
    </div>
  );
};
