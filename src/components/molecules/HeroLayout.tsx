import { FC } from "react";
import { env } from "../../env/client.mjs";

type Props = {
    children: React.ReactNode;
    attribute: string;
}

const HeroLayout: FC<Props> = ({ children, attribute }) => {

    return (
        <section className="text-neutral-100 space-y-4  p-4">
            <div className="flex gap-4 items-center">
                <div className="flex space-x-1 items-center">
                    <img src={`${env.NEXT_PUBLIC_STEAM_IMG_URL}/apps/dota2/images/dota_react/icons/hero_${attribute}.png`} className=" w-6" />
                    <h1 className="font-bold tracking-wide text-neutral-400 uppercase">{attribute}</h1>
                </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2  ">{children}</div>
        </section>
    );
}

export default HeroLayout
