import { useSession } from 'next-auth/react';
import Login from '../../components/element/login';

const Profile = () => {
  const { data: session } = useSession();

  console.log(session);

  if (!session || !session.user?.steamId) {

    return <Login />

  } else {

    return (
      <div>
        Proflie
      </div>
    );

  }
};

export default Profile;
