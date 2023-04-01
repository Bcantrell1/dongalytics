import { FC } from "react";

type Props = {
    children: React.ReactNode;
}

const MatchesLayout: FC<Props> = ({ children }) => {

    return (
        <div className="flex justify-evenly gap-5 flex-wrap my-4">{children}</div>
    );
}

export default MatchesLayout;
