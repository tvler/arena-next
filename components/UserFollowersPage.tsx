import { useQuery } from "@apollo/client";
import { UserSsr, UserSsrVariables } from "../graphql/gen/UserSsr";
import userSsr from "../graphql/queries/userSsr";
import Header from "./Header";
import UserDetails from "./UserDetails";
import UserFollowersGrid from "./UserFollowersGrid";

type Props = {
  slug: string;
};

const UserFollowersPage: React.FC<Props> = ({ slug }) => {
  /*
   * Queries
   */

  const serversideQuery = useQuery<UserSsr, UserSsrVariables>(userSsr, {
    ssr: true,
    variables: { id: slug },
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
      <Header
        taxonomy={[
          { display: user.name ?? "User", href: `/user/${slug}` },
          "Followers",
        ]}
      />

      <UserDetails id={slug} />

      <UserFollowersGrid id={slug} />
    </div>
  );
};

export default UserFollowersPage;
