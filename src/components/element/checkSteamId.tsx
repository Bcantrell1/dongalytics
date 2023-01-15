import Link from "next/link";
import { api } from "../../utils/api";

const CheckSteamId = () => {
  const steamId = api.user.getSteamId.useQuery(undefined);
 
  return ( 
    <div> 
      { steamId.data ? 
	null
	: 
	<div className="hero rounded" style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` }}>
	  <div className="hero-overlay bg-opacity-60"></div>
	  <div className="hero-content text-center text-neutral-content">
	    <div className="max-w-md">
	      <h1 className="mb-5 text-5xl font-bold">You Must Link Steam!</h1>
	      <p className="mb-5">Sign in through the steam portal!</p>
	      <Link href="/api/auth/login" className="btn btn-primary">Link Steam</Link>
	    </div>
	  </div>
	</div>
	} 
    </div>
  );
};

export default CheckSteamId;