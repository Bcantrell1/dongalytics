import Loading from "../../../components/atoms/Loading";
import HeroHeader from "../../../components/molecules/HeroHeader";

import { api } from "../../../utils/api";
import { getServerAuthSession } from "../../../server/auth";

import { THero, TMatchStats } from "../../../types/dota";
import LevelSlider from "../../../components/atoms/LevelSlider";
import { useState } from "react";
import HeroHealthMana from "../../../components/atoms/HeroHealthMana";
import { formatDateTime } from "../../../helpers/convert";

function HeroPage({ id }: { id: string }) {
    const [level, setLevel] = useState<number>(1);

    const heroMatches = api.openDota.getPlayerHeroMatches.useQuery({ id: id });
    const getHeroes = api.openDota.getConstHeroes.useQuery();

    const { data, isLoading: loading, isError: error } = getHeroes;
    const heroList: Array<THero> = Object.values(data || {});
    const filteredHero: Array<THero> = heroList.filter((hero: THero) => hero.id.toString() === id);

    // @ts-ignore
    const { data: heroMatchesData, isLoading, isError }: { data: TMatchStats[]; isLoading: boolean; isError: boolean; } = heroMatches;

    if (isLoading || loading) {
        return <Loading />;
    }

    if (isError || error) {
        return <div>Error</div>;
    }

    if(!filteredHero[0]) {
        return <div>Hero not found</div>
    } else {
        return (
            <div className="w-full mx-auto space-y-12 p-3">
                <HeroHeader hero={filteredHero[0]} />
                <LevelSlider hero={filteredHero[0]} level={level} setLevel={setLevel} />
                <HeroHealthMana hero={filteredHero[0]} level={level} />
                { heroMatchesData.length > 0 ? (
                <div>
                    <h2 className="text-2xl text-center font-bold text-gray-900 md:text-3xl">
                        Your Matches with {filteredHero[0].localized_name}
                    </h2>
                    {heroMatchesData.map((match) => (
                        <article  key={match.match_id} className="rounded-xl my-4 border-2 border-gray-100 bg-white">
                            <a href={'/match/'+ match.match_id}>
                            {match.player_slot <= 10 ? (
                                <div className="flex flex-row justify-between items-center p-4">
                                    <div className="flex flex-row items-center">
                                        <img src="/img/radiant.png" alt="radiant" className="w-24 h-14" />
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <p className="text-gray-900 font-bold mx-2">{formatDateTime(match.start_time)}</p>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <p className={!match.radiant_win ? 'text-red-600' : 'text-green-600'}>{match.radiant_win ? "Win" : "Lose"}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-row justify-between items-center p-4">
                                    <div className="flex flex-row items-center">
                                        <img src="/img/dire.png" alt="dire" className="w-24 h-14" />
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <p className="text-gray-900 font-bold ml-2">{formatDateTime(match.start_time)}</p>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <p className={match.radiant_win ? 'text-red-600' : 'text-green-600'}>{match.radiant_win ? "Lose" : "Win"}</p>
                                    </div>
                                </div>
                            )}
                            </a>
                        </article>
                    ))}
                </div>
                ) : (
                <div className="flex flex-col justify-center items-center">
                    <p className="text-gray-900 font-bold text-2xl">No turbo matches found</p>
                </div>
                )}
            </div>
        );
    }
}

export async function getServerSideProps(context: any) {
    const session = await getServerAuthSession(context);
    const { id } = context.query;

    if (!session || !session?.user?.steamId) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
            id
        },
    };
};

export default HeroPage;
