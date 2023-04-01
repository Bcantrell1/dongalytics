import { env } from "../../env/client.mjs";
import { HERO_NAMES } from "../../helpers/constants";
import { getBenchMarkPlayers } from "../../helpers/convert";

const benchmarks = [
    { type: "kills", title: "Most Kills" },
    { type: "deaths", title: "Most Deaths" },
    { type: "assists", title: "Most Assists" },
    { type: "tower_damage", title: "Most Tower Damage" },
    { type: "gold_spent", title: "Blowing Money" },
    { type: "hero_damage", title: "Most Hero Damage" },
    { type: "obs_placed", title: "Most Wards Placed" },
    { type: "gold_per_min", title: "Most Gold Per Minute" },
];

function BenchmarksLayout({ matchData }: { matchData: any }) {
    const benchmarksData = benchmarks.map(benchmark => {
        const benchmarkData = matchData.players.map((player: any) => {
            return {
                name: player.personaname ? player.personaname : "Smurf ?",
                heroId: player.hero_id,
                value: player[benchmark.type]
            };
        });

        return {
            title: benchmark.title,
            data: benchmarkData,
            type: benchmark.type
        };
    });


    const benchmarksList = benchmarksData.map(benchmark => {
        return getBenchMarkPlayers(matchData.players, benchmark.type, benchmark.title);
    });

    return (
        <div className="grid gap-3 grid-cols-3 align-middle mx-auto">
            {benchmarksList.map((benchmark: any) => {
                return (
                    <div className="text-center p-2 text-2xs">
                        {/*@ts-ignore*/}
                        <img src={`${env.NEXT_PUBLIC_STEAM_IMG_URL}${HERO_NAMES[benchmark.heroId].icon}`} className="w-auto h-auto mx-auto object-fill" alt="" />
                        <h2 className="font-bold leading-0 text-base">
                            {benchmark?.name ?? (
                                <span className="text-xs font-normal text-gray-400">
                                    Name not available
                                </span>
                            )}
                        </h2>
                        <p>{benchmark?.title}</p>
                        <p className="font-bold text-sm">
                            {benchmark?.value ?? "NA"}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default BenchmarksLayout;
