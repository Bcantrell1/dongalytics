import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { type NextPage } from "next";

const Navbar: NextPage = () => {

  const { data: sessionData } = useSession();

  return (
    <div className="navbar bg-neutral">
      <div className="flex-1">
        <Link href={'/'} className="btn glass border-none normal-case text-xl">Dongalytics</Link>
      </div>
      {
        sessionData ? (
      <div className="flex-none"> 
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-outline btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={sessionData.user?.image || 'https://placeimg.com/80/80/people'} />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href={"/profile"} className="justify-between">
                Profile
              </Link>
            </li>
            <li><Link href={'/settings'}>Settings</Link></li>
            <li><Link href={''} onClick={() => void signOut()}>Logout</Link></li>
          </ul>
        </div>
      </div>
      ) : (
        <Link className="btn btn-primary" href={''} onClick={()=> void signIn()}>Sign In</Link>
        )
      }
    </div>
  );
};

export default Navbar;
