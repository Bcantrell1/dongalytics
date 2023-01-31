import { NextPage } from "next";
import ProfileHeader from "../components/molecules/ProfileHeader";
import { getServerAuthSession } from "../server/auth";

const SettingsPage: NextPage = () => {

  return (
    <main>
      <ProfileHeader settings={true} />
    </main>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getServerAuthSession(context);

  if (!session || !session?.user?.steamId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default SettingsPage;
