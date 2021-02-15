import { useQuery } from "@apollo/client";
import {
  UserSsrQuery,
  UserSsrQueryVariables,
} from "../graphql/gen/UserSsrQuery";
import { userSsrQueryNode } from "../graphql/queries/userSsr";
import { Header } from "./Header";
import { Spacer } from "./Spacer";
import { UserDetails } from "./UserDetails";
import { UserFollowersGrid } from "./UserFollowersGrid";

type Props = {
  slug: string;
};

export const UserFollowersPage: React.FC<Props> = ({ slug }) => {
  /*
   * Queries
   */

  const serversideQuery = useQuery<UserSsrQuery, UserSsrQueryVariables>(
    userSsrQueryNode,
    {
      ssr: true,
      variables: { id: slug },
    }
  );

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
  const user = serversideQuery.data?.user;
  if (!user) {
    return null;
  }

  /*
   * Default
   */

  return (
    <div className="flex flex-col pb-4">
      <Header
        taxonomy={[
          { display: user.name ?? "User", href: `/user/${slug}` },
          "Followers",
        ]}
      />

      <UserDetails id={slug} />

      <Spacer size="8" />

      <UserFollowersGrid id={slug} />
    </div>
  );
};
