import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import userSsr from "../graphql/queries/userSsr";
import Link from "next/link";
import Header from "./Header";
import UserDetails from "./UserDetails";

const User: React.FC = () => {
  /*
   * Queries
   */

  const router = useRouter();
  const { id } = router.query;

  const serversideQuery = useQuery(userSsr, {
    ssr: true,
    variables: { id },
  });

  /*
   * Early exits
   */

  //  Loading
  if (serversideQuery.loading) {
    return (
      <div className="flex flex-col">
        <Header loading />
      </div>
    );
  }

  //  Not a user
  if (serversideQuery.data?.identity?.identifiable?.__typename !== "User") {
    return null;
  }

  /*
   * Default
   */

  const user = serversideQuery.data.identity.identifiable;

  return (
    <div className="flex flex-col pb-4">
      <Header taxonomy={[user.name ?? "user"]} />

      <UserDetails id={id} />

      {/* {JSON.stringify(user)} */}
    </div>
  );
};

export default User;
