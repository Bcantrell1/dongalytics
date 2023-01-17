import { useSession } from "next-auth/react";
import Link from "next/link";

export default function custom404() {
  const { data: session } = useSession();

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img src="/img/banana_primary.svg" className="max-w-sm rounded-lg" />
        <div>
          <h1 className="text-5xl text-accent font-bold">404</h1>
          <p className="py-6">This page doesnt exist, how did you find yourself here?</p>
          {session ? (
            <Link href="/profile" className="btn btn-accent glass">Back To Profile</Link>
            ) : (
            <Link href="/" className="btn text-accent glass">Back Home</Link>
          )}
        </div>
      </div>
    </div>
  );
};
