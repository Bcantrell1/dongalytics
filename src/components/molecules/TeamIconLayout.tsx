import { env } from "../../env/client.mjs";
import { HERO_NAMES } from "../../helpers/constants";
import { THero } from "../../types/dota.js";

const TeamIconLayout = ({ team }) => {

    return (
        <ul className={`flex gap-2 w-full justify-evenly items-center`}>
            {team.map((hero) =>  {
                const heroName: THero = HERO_NAMES[hero.hero_id];
                return (
                    <li key={`${heroName.id}`} className=" h-8">
                      <img src={`${env.NEXT_PUBLIC_STEAM_IMG_URL}${heroName.icon}`} className="w-auto h-auto object-fill" alt={heroName.localized_name} />
                    </li>
                    );
                }
            )}
        </ul>
    );
};

export default TeamIconLayout;
