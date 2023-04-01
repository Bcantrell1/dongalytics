import { TTeamMatches } from "../../types/dota";
import MatchPlayerCard from "../atoms/MatchPlayerCard";
import BenchmarksLayout from "./BenchMarksLayout";

function MatchPlayerLayout({ matchData }: { matchData: TTeamMatches}) {
    const radiantPlayers = matchData?.players.filter((player) => player.isRadiant);
    const direPlayers = matchData?.players.filter((player) => !player.isRadiant);

    return (
        <>
            <div className="flex justify-around mb-12">
                <div>
                    <h3 className="text-2xl text-center font-bold text-green-500">{matchData?.radiant_win ? 'Winner' : 'Loser'}</h3>
                <div className="border-2 rounded border-green-200">
                    {radiantPlayers.map((player) => (
                        <MatchPlayerCard key={player.player_slot} player={player} />
                    ))}
                </div>
                </div>
                <div>
                    <h3 className="text-2xl text-center font-bold text-red-500">{matchData?.radiant_win ? 'Loser' : 'Winner'}</h3>
                <div className="border-2 rounded border-red-200">
                    {direPlayers.map((player) => (
                        <MatchPlayerCard key={player.player_slot} player={player} />
                    ))}
                </div>
                </div>
            </div>
            <BenchmarksLayout matchData={matchData} />
        </>
    );
}

export default MatchPlayerLayout;

