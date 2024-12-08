import { useDispatch, useSelector } from "react-redux";
import { setAudioSrc, resetAudioSrc } from "../redux/audioSlice";
import { Button } from "@/components/ui/button";

const AudioUploader = () => {
  const dispatch = useDispatch();
  const isFileUploaded = useSelector((state) => state.audio.isFileUploaded);

  const handleFileUpload = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      dispatch(setAudioSrc(url));
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file);
  };

  const handleReset = () => {
    dispatch(resetAudioSrc());
  };

  return (
    <div className="flex flex-col items-center mb-4 border-2 border-dashed border-gray-300 p-4">
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileInputChange}
        className="hidden"
        id="audio-upload"
      />
      {!isFileUploaded ? (
        <Button
          onClick={() => document.getElementById("audio-upload").click()}
          className="mt-4"
        >
          Upload Song
        </Button>
      ) : (
        <Button onClick={handleReset} className="mt-4">
          Reset Upload
        </Button>
      )}
    </div>
  );
};

export default AudioUploader;
