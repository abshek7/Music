import { useSelector, useDispatch } from "react-redux";
import { setEffect } from "../redux/audioSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EffectSelector = () => {
  const effect = useSelector((state) => state.audio.effect);
  const dispatch = useDispatch();

  return (
    <div className="mb-4 flex justify-center">
      <Select
        value={effect}
        onValueChange={(value) => dispatch(setEffect(value))}
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Select effect" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rainbowBars">Rainbow Bars</SelectItem>
          <SelectItem value="circularEqualizer">Circular Equalizer</SelectItem>
          <SelectItem value="bars">Bar Visualizer</SelectItem>

        </SelectContent>
      </Select>
    </div>
  );
};

export default EffectSelector;
