import { HERO_NAMES } from "../../helpers/constants";
import { getHeroLevel, truncate } from "../../helpers/convert";
import { THero } from "../../types/dota";
import HeroIcon from "./HeroIcon";

function MatchPlayerCard({ player }: { player: any }) {
    //@ts-ignore
    const heroName: THero = HERO_NAMES[player.hero_id];
    return (
        <div
            className="p-2 mb-2 flex gap-4 items-center justify-center rounded w-full max-w-[200px] min-w-[175px]"
            key={player.player_slot}>
            <div>
                <HeroIcon hero={heroName} />
                <div className="text-xs mt-2 text-center w-fit mx-auto">
                    {player.xp_t ? getHeroLevel(player.xp_t[player.xp_t.length - 1]) : null}
                </div>
            </div>
            <div className="space-y-0.5">
                <h4 className="font-bold">
                    {player.name ? (
                        truncate(player.name)
                    ) : truncate(player.personaname) ? (
                        truncate(player.personaname)
                    ) : (
                        <span className="text-2xs text-gray-400">Smurf ?</span>
                    )}
                </h4>
                <div className="text-xs flex items-center">
                    <p>
                        {player.kills}/{player.deaths}/{player.assists}
                    </p>
                </div>
                <div className="pt-2 flex items-center gap-2">
                    <p className="flex items-center text-xs">
                        {new Intl.NumberFormat("en-US").format(Number(player.hero_damage ?? 0))}
                    </p>
                    <div className="flex items-center text-xs" data-tip="Net Worth">
                        {new Intl.NumberFormat("en-US").format(Number(player.net_worth ?? 0))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MatchPlayerCard;
