import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { UserSsr, UserSsrVariables } from "../graphql/gen/UserSsr";
import userSsr from "../graphql/queries/userSsr";
import Header from "./Header";
import UserDetails from "./UserDetails";

const UserPage: React.FC = () => {
  /*
   * Queries
   */

  const router = useRouter();
  const nonStringId = router.query.id;
  const id: string = typeof nonStringId === "string" ? nonStringId : "";

  const serversideQuery = useQuery<UserSsr, UserSsrVariables>(userSsr, {
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

export default UserPage;
