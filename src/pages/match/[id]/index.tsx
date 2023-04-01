import PageHeading from "../../../components/atoms/PageHeading";
import MatchPlayerLayout from "../../../components/molecules/MatchPlayerLayout";
import { getServerAuthSession } from "../../../server/auth";
import { api } from "../../../utils/api";

const GetMatch = ({matchId}: {matchId: number}) => {
    const matchDetails = api.openDota.getMatchDetails.useQuery({matchId: matchId}, {refetchOnWindowFocus: false});
    const {data: matchData, isLoading, isError} = matchDetails;

    if (isLoading) return <main>Loading...</main>;
    if (isError) return <main>Error</main>;

    return (
        <section className="px-2">
            <PageHeading title="Match Details" />
            <MatchPlayerLayout matchData={matchData} />
        </section>
    );
};

export default GetMatch;

export const getServerSideProps = async (context: any) => {
    const session = await getServerAuthSession(context);
    const { id } = context.query;
    const matchId = Number(id);

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
            matchId,
        },
    };
};
