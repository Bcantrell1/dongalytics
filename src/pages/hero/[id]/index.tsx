import { NextPage } from "next";

import Loading from "../../../components/atoms/Loading";
import HeroHeader from "../../../components/molecules/HeroHeader";

import { api } from "../../../utils/api";
import { getServerAuthSession } from "../../../server/auth";

import { THero, TMatchStats } from "../../../types/dota";
import LevelSlider from "../../../components/atoms/LevelSlider";
import { useState } from "react";

const HeroPage: NextPage = ({ id }) => {
    const [level, setLevel] = useState<number>(1);

    const getHeroes = api.openDota.getConstHeroes.useQuery();
    const { data, isLoading: loading, isError: error } = getHeroes;
    const heroList: Array<THero> = Object.values(data || {});
    const filteredHero: Array<THero> = heroList.filter((hero: any) => hero.id.toString() === id);

    const heroMatches = api.openDota.getPlayerHeroMatches.useQuery({id: id});
    // @ts-ignore
    const { data: heroMatchesData, isLoading, isError }: {data: TMatchStats[], isLoading: boolean, isError: boolean} = heroMatches;

    if (isLoading || loading) {
        return <Loading />;
    }

    if (isError || error) {
        return <div>Error</div>;
    }

    return (
        <div className="2xl:w-5/6 xl:w-3/4 lg:w-3/4 w-full mx-auto space-y-12">
            <HeroHeader hero={filteredHero[0]} />
            <LevelSlider hero={filteredHero[0]} level={level} setLevel={setLevel} />
            { heroMatchesData.map((match) => (
                <article className="flex" key={match.match_id}>
                    <p>Match ID: {match.match_id}</p>
                    <p>Player Slot: {match.player_slot}</p>
                    <p>Hero ID: {match.hero_id}</p>
                </article>
            ))}
        </div>
    );
};

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
