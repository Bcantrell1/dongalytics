import type { GetServerSideProps } from 'next';
import ProfileHeader from '../../components/molecules/ProfileHeader';
import { getServerAuthSession } from '../../server/auth';

const Profile = () => {

 return (
    <main>
      <ProfileHeader settings={false}/>
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
