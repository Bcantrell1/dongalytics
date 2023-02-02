import { type NextPage } from "next";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import DiscordButton from "../atoms/DiscordButton";
import NavButton from "../atoms/NavButton";
import { useOutsideAlerter } from "../../helpers/hooks";

const Navbar: NextPage = () => {
  const { data: sessionData } = useSession();
  const [open, setOpen] = useState(false);
  const node = useRef(null);
  useOutsideAlerter({ ref: node, callback: () => setOpen(false) });

  return (
    <header ref={node} className="border-b bg-gray-100">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button type="button" onClick={() => setOpen(!open)} className="p-2 sm:mr-4 lg:hidden">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          <Link href={'/'} className="flex items-center justify-center rounded-xl border-4 border-black bg-indigo-500 px-8 py-2 font-bold transition hover:shadow-none focus:outline-none focus:ring active:bg-pink-50">Dongalytics</Link>
        </div> 
      { sessionData ? (
      <div className="flex flex-1 items-center justify-end"> 
         <nav
        className={open ? 'flex flex-col p-4 mt-32 z-10 bg-gray-100 ' : 'hidden '+"lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-500"}
      >
        <NavButton
          href="/profile"
        >
          Profile
        </NavButton>

        <NavButton
          href="/heroes"
        >
          Heroes
        </NavButton>

        <NavButton
          href="matches"
        >
          Matches
        </NavButton>
      </nav>
      <div className="ml-8 flex items-center">
        <div
          className="flex items-center divide-x divide-gray-100 border-x border-gray-100"
        >
          <span>
            <Link
              href="/settings"
              className="block border-b-4 border-transparent p-2 hover:border-indigo-600"
            >
              <img height={40} width={40} src={sessionData.user?.image || 'https://placeimg.com/80/80/people'} />
            </Link>
          </span>
        </div>
      </div>
      </div>
      ) : (
          <DiscordButton />
      )}
      </div>
    </header>
  );
};

export default Navbar;
