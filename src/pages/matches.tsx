import { api } from "../utils/api";
import { getServerAuthSession } from "../server/auth";

import MatchesLayout from "../components/molecules/MatchesLayout";
import MatchCard from "../components/molecules/MatchCard";

import { MatchType } from "../types/dota";
import Loading from "../components/atoms/Loading";
import PageHeading from "../components/atoms/PageHeading";

const MatchesPage = () => {
  const matches = api.openDota.getPlayerRecentMatches.useQuery({limit: 20}, {refetchOnMount: false, refetchOnWindowFocus: false});
  const { data: playerMatches, error, isLoading } = matches;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return null;
  }

  return (
    <>
      <PageHeading title="Recent Matches" subtitle="These are your 20 most recent performances which your dong size is measured from! Make sure to inspect them to try to become a giga chad like Dumple."/>
      <MatchesLayout>
        {playerMatches?.map((match: MatchType) => (
          <MatchCard key={match.match_id} match={match} />
        ))}
      </MatchesLayout>
    </>
  );
};

export default MatchesPage;

export async function getServerSideProps(context: any) {
    const session = await getServerAuthSession(context);

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
        },
    };
};
