import { env } from "../../env/client.mjs";
import { THero } from "../../types/dota.js";

const HeroIcon = ({hero}: {hero: THero}) => {
    const { name, icon } = hero;

    return (
        <img src={`${env.NEXT_PUBLIC_STEAM_IMG_URL}${icon}`} className="w-auto h-auto object-fill" alt={name} />
    );
};

export default HeroIcon;
