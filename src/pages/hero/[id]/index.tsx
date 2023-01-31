import { NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "../../../utils/api";

const HeroPage: NextPage = () => {
    const router = useRouter();
    const id = router.query.id as string;
    const hero = api.openDota.getPlayerHeroMatches.useQuery({id: id});

    return (
        <div>
            <p>Hero: {id}</p>
            <pre>{JSON.stringify(hero, null, 2)}</pre>
        </div>
    );
};

export default HeroPage;
