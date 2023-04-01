import { MatchType } from "../../types/dota";
import TeamIconLayout from "../molecules/TeamIconLayout";

const MatchHeroes = ({ match }: { match: MatchType }) => {
    const radiantTeam = match.players.filter((player) => player.player_slot <= 10);
    const direTeam = match.players.filter((player) => player.player_slot > 10);

    return (
        <div className="flex gap-4 p-3 mt-1 items-center rounded flex-col w-full">
            <div className="flex items-center w-full gap-2">
                {match.radiant_win ? (
                    <p className="w-5 h-5 font-bold text-emerald-500">W</p>
                ) : (
                    <p className="w-5 h-5 font-bold text-red-500">L</p>
                )}
                <TeamIconLayout team={radiantTeam} />
            </div>
            <div className="flex items-center w-full gap-2">
                {!match.radiant_win ? (
                    <p className="w-5 h-5 font-bold text-emerald-500">W</p>

                ) : (
                    <p className="w-5 h-5 font-bold text-red-500">L</p>
                )}
                <TeamIconLayout team={direTeam} />
            </div>
        </div>
    );
}

export default MatchHeroes;
