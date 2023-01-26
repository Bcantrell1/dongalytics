import { useSession } from "next-auth/react";
import ButtonBlue from "../components/atoms/ButtonBlue";

export default function custom404() {
  const { data: session } = useSession();

  return (
    <main className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can't find that page.</p>
        {session ? (
          <ButtonBlue route="/profile">Back To Profile</ButtonBlue>
        ) : (
          <ButtonBlue route="/">Back Home</ButtonBlue>
        )}
      </div>
    </main>
  );
};
