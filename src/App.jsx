import AudioUploader from "./components/AudioUploader";
import AudioPlayer from "./components/AudioPlayer";
import EffectSelector from "./components/EffectSelector";
import Visualizer from "./components/Visualizer";

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
        Experience Innovation
    </h1>
      <AudioUploader />
      <AudioPlayer />
      <EffectSelector />
      <Visualizer />
    </div>
  );
};

export default App;
