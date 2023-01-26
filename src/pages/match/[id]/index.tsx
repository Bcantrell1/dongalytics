import { useRouter } from "next/router";

const GetMatch = () => {
    const router = useRouter();
    const id = router.query.id as string;
    return <main>Match: {id}</main>;
};

export default GetMatch;
