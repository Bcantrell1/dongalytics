import { useRouter } from "next/router";

const HeroPage = () => {
    const router = useRouter();
    const id = router.query.id as string;
    return <main>Hero: {id}</main>;
};

export default HeroPage;
