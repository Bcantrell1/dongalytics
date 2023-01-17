import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import CheckSteamId from "./checkSteamId";

const Login = () => {
  const { data: session } = useSession();

  return ( 
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
	{ !session ? (
	<div className="max-w-md">
	  <h1 className="text-5xl font-bold">Login to use your dong...</h1>
	  <p className="py-6">To determine who you are and serve statics you may be interested in please using one of the services to login.</p>
	  <button onClick={() => void signIn()} className="btn btn-primary">Login</button>
	</div>
	)
	: !session?.user?.steamId && <CheckSteamId /> }
      </div>
    </div>
  );
}

export default Login;
