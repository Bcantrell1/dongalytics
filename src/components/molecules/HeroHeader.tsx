import { env } from "../../env/client.mjs";
import { THero } from "../../types/dota";
import Badge from "../atoms/Badge";

const HeroHeader = ({hero}:{hero: THero}) => {
    const { localized_name, img, roles } = hero;

    return (
        <div className="text-lg flex items-center mx-auto my-4 w-fit gap-4 flex-wrap justify-center">
            <img src={`${env.NEXT_PUBLIC_STEAM_IMG_URL}${img}`} className="w-auto h-auto object-fill rounded shadow-2xl" />
            <div className="space-y-4 flex flex-col 2xl:items-start xl:items-start lg:items-start md:items-start items-center">
                <h4 className="w-fit font-semibold tracking-wide text-2xl">
                    {localized_name}
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                    {
                        roles.map((role) => (
                            <Badge key={`role-${role}`} color="indigo">
                                {role}
                            </Badge>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default HeroHeader;
