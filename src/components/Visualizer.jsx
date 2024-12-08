import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  drawBars,
  drawCircularEqualizer,
  drawRainbowBars,
} from "../utils/visualizations";

const Visualizer = () => {
  const { audioSrc, effect } = useSelector((state) => state.audio);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationRef = useRef(null);
  const barsRef = useRef([]);
  const audioRef = useRef(null);

  useEffect(() => {
    if (
      !audioContextRef.current ||
      audioContextRef.current.state === "closed"
    ) {
      audioContextRef.current = new (window.AudioContext ||
        window.AudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
    }

    audioRef.current = document.querySelector("audio");

    if (audioRef.current && !sourceRef.current) {
      sourceRef.current = audioContextRef.current.createMediaElementSource(
        audioRef.current
      );
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }
    };
  }, [audioSrc]);

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      if (effect !== "rainbowBars") {
        animate();
      }
    }
  }, [audioSrc, effect]);

  useEffect(() => {
    if (effect === "rainbowBars" && audioSrc) {
      const animateRainbowBars = () => {
        if (!analyserRef.current) return;
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);
        drawRainbowBars(dataArray, barsRef.current);
        animationRef.current = requestAnimationFrame(animateRainbowBars);
      };
      animateRainbowBars();
    }
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [effect, audioSrc]);

  const animate = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const analyser = analyserRef.current;

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (effect === "bars") {
        drawBars(ctx, bufferLength, dataArray, canvas);
      } else if (effect === "circularEqualizer") {
        drawCircularEqualizer(ctx, bufferLength, dataArray, canvas);
      } else if (effect === "rainbowBars") {
        drawRainbowBars(dataArray, barsRef.current);
      }
    };

    draw();
  };

  return effect === "rainbowBars" ? (
    <div
      id="visualizer-container"
      className="flex items-center justify-around w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
    >
      {[...Array(42)].map((_, index) => (
        <div
          key={index}
          ref={(element) => (barsRef.current[index] = element)}
          className="bar"
          style={{
            backgroundColor: `hsl(${(index * 360) / 42}, 100%, 50%)`,
            width: "10px",
            borderRadius: "5px",
          }}
        ></div>
      ))}
    </div>
  ) : (
    <canvas
      ref={canvasRef}
      className="border border-gray-300 w-full h-[200px] sm:h-[300px] md:h-[400px]"
    />
  );
};

export default Visualizer;
