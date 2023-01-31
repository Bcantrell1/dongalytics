import type { GetServerSideProps, NextPage } from 'next';
import Loading from '../../components/atoms/Loading';
import ProfileHeader from '../../components/molecules/ProfileHeader';
import { getServerAuthSession } from '../../server/auth';
import { api } from '../../utils/api';

const Profile: NextPage = () => {
  const profile = api.openDota.getProfile.useQuery();
  const { data, isLoading, isError } = profile;
  
  if(isLoading) {
    return <Loading />
  }
  
  if(isError) {
    return <p>Error</p>
  }

 return (
    <main>
      <pre>{JSON.stringify(profile.data, null, 2)}</pre>
      <ProfileHeader personaname={data.personaname} settings={false}/>
    </main>
  );

};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if(!session || !session?.user?.steamId) {
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
