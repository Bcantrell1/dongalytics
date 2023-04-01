import { GAME_MODES } from "../../helpers/constants";
import { convertRankName, formatDateTime } from "../../helpers/convert";
import { MatchType } from "../../types/dota";
import { api } from "../../utils/api";
import MatchHeroes from "../atoms/MatchHeroes";
import RankImage from "../atoms/RankImage";


const MatchCard = ({ match }: { match: MatchType }) => {
    const matchInfo = api.openDota.getMatchDetails.useQuery({ matchId: match.match_id }, { refetchOnWindowFocus: false, refetchOnMount: false});

    const { data, isLoading, isError } = matchInfo;

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error</div>
    }

    return (
        <a href={`/match/${data.match_id}`} className="2xl:w-fit xl:w-fit lg:w-fit md:w-fit w-full px-2 hover:shadow-xl rounded">
            <div className="h-auto flex items-end gap-2 justify-between border-b border-black">
                <div>
                    <p className="mb-0 flex h-fit w-fit mx-auto">
                        <RankImage rank={convertRankName(match.average_rank) ?? 0} />
                    </p>
                    <p className="text">{formatDateTime(data.start_time)}</p>
                </div>
                <div>
                    <p className="text text-left capitalize">
                        {GAME_MODES[data.game_mode]?.name.split("_").join(" ")}
                    </p>
                    <p className="text text-right capitalize">{data.match_id}</p>
                </div>
            </div>
            <MatchHeroes match={data} />
        </a>
    );
};

export default MatchCard;
