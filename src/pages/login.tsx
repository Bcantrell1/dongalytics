import { NextPage } from "next";
import { useSession } from "next-auth/react";
import SteamLink from "../components/molecules/SteamLink";
import UserLogin from "../components/molecules/UserLogin";

const LoginPage: NextPage = () => {
	const { data: session } = useSession();
	
	return (
		<main>
			{ !session ? (<UserLogin />) : (<SteamLink session={session} />) }
		</main>
	);
};

export default LoginPage;
