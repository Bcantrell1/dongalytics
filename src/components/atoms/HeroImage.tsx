import Link from "next/link";
import { FC } from "react";
import { env } from "../../env/client.mjs";

type Props = {
    image: string | null;
    id: string;
    match: string;
}

const HeroImage: FC<Props> = ({ image, id, match }) => {

    return (
        <div className={`w-full hover:scale-125 transition-transform rounded ${match} tooltip tooltip-primary hover:z-20`}>
            {image === null ? (
                <div className="h-24 w-full bg-indigo-50 animate-pulse"></div>
            ) : (
                <Link href={`/hero/${id}`}>
                    <img
                        src={`${env.NEXT_PUBLIC_STEAM_IMG_URL}${image}`}
                        className={`w-full h-auto rounded-sm cursor-pointer transition-opacity `}
                        loading="eager"
                    />
                </Link>
            )}
        </div>
    );
};

export default HeroImage;
