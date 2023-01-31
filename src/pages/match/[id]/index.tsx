import { NextPage } from "next";
import { useRouter } from "next/router";

const GetMatch: NextPage = () => {
    const router = useRouter();
    const id = router.query.id as string;
    return <main>Match: {id}</main>;
};

export default GetMatch;
