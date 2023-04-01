import type { GetServerSideProps, NextPage } from 'next';

import Loading from '../../components/atoms/Loading';
import ProfileHeader from '../../components/molecules/ProfileHeader';

import { getServerAuthSession } from '../../server/auth';
import { api } from '../../utils/api';

const Profile: NextPage = () => {
  const profile = api.openDota.getProfile.useQuery({}, { refetchOnMount: false, refetchOnWindowFocus: false });
  const { data, isLoading, isError, error} = profile;

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );

};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (!session || !session?.user?.steamId) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

export default Profile;
