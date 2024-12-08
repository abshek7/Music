import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";

const AudioPlayer = () => {
  const audioSrc = useSelector((state) => state.audio.audioSrc);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      const audioContext = new window.AudioContext();
      audioContext.resume();
    }
  }, [audioSrc]);

  return (
    audioSrc && (
      <div className="mb-4 flex justify-center">
        <audio
          ref={audioRef}
          src={audioSrc}
          controls
          className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px]"
        />
      </div>
    )
  );
};

export default AudioPlayer;
