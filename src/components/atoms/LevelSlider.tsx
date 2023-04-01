import { Dispatch, SetStateAction } from "react";
import { THero } from "../../types/dota";
import HeroIcon from "./HeroIcon";

const LevelSlider = ({ hero, level, setLevel }: { hero: THero, level: number, setLevel: Dispatch<SetStateAction<number>> }) => {
    return (
        <div className="w-full h-auto border-black border-2 flex items-center p-4 rounded">
            <div className="rounded-full">
                <HeroIcon hero={hero} />
            </div>
            <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={level}
                className="w-full bg-red-700 range range-xs mt-0.5 mx-4 opacity-90 flex-grow "
                onChange={(e: any) => setLevel(e.currentTarget.value)}
            />
            <span className="text-xs mt-1 whitespace-nowrap">Level {level}</span>
        </div>
    );
}

export default LevelSlider;
