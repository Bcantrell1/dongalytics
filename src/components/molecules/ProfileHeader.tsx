import { api } from "../../utils/api";
import { signOut } from "next-auth/react";

const ProfileHeader = ({ personaname, settings }: { personaname: string, settings: boolean }) => {
  const deleteSteamId = api.user.deleteSteamId.useMutation();

  function handleDeleteSteamId(): void {
    deleteSteamId.mutate();
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  }

  return (
    <header aria-label="Page Header">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {settings ? 'Account Settings' : 'Welcome Back'}, {personaname}
            </h1>
          </div>
          {settings && (
            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <button onClick={handleDeleteSteamId} className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring">
                <span
                  className="absolute inset-0 border border-red-600 group-active:border-red-500"
                ></span>
                <span
                  className="block border border-red-600 bg-red-600 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                >
                  Remove Linked Steam
                </span>
              </button>
              <button onClick={() => void signOut()} className="group relative inline-block text-sm font-medium text-red-600 focus:outline-none focus:ring active:text-red-500">
                <span
                  className="absolute inset-0 border border-current"
                ></span>
                <span
                  className="block border border-current bg-white px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"
                >
                  Sign Out
                </span>
              </button>

            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
