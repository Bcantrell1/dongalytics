import MatchPlayerCard from "../atoms/MatchPlayerCard";
import BenchmarksLayout from "./BenchMarksLayout";

function MatchPlayerLayout({ matchData }: { matchData: any}) {
    const radiantPlayers = matchData?.players.filter((player: any) => player.isRadiant);
    const direPlayers = matchData?.players.filter((player: any) => !player.isRadiant);

    return (
        <>
            <div className="flex justify-around mb-12">
                <div>
                    <h3 className="text-2xl text-center font-bold text-green-500">{matchData?.radiant_win ? 'Winner' : 'Loser'}</h3>
                <div className="border-2 rounded border-green-200">
                    {radiantPlayers.map((player: any) => (
                        <MatchPlayerCard key={player.player_slot} player={player} />
                    ))}
                </div>
                </div>
                <div>
                    <h3 className="text-2xl text-center font-bold text-red-500">{matchData?.radiant_win ? 'Loser' : 'Winner'}</h3>
                <div className="border-2 rounded border-red-200">
                    {direPlayers.map((player: any) => (
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

