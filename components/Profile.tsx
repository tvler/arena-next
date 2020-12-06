import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import profileSsr from "../queries/profileSsr";

const Profile: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const q = useQuery(profileSsr, {
    ssr: true,
    variables: {
      id,
    },
  });

  return <div>{JSON.stringify(q.data)}</div>;
};

export default Profile;
