import { useQuery } from "@apollo/client";
import {
  UserSsrQuery,
  UserSsrQueryVariables,
} from "../graphql/gen/UserSsrQuery";
import { userSsrQueryNode } from "../graphql/queries/userSsr";
import { Header } from "./Header";
import { Spacer } from "./Spacer";
import { UserDetails } from "./UserDetails";
import { BlockGrid } from "./BlockGrid";
import {
  UserFollowersQuery,
  UserFollowersQueryVariables,
} from "../graphql/gen/UserFollowersQuery";
import { userFollowersQueryNode } from "../graphql/queries/userFollowers";

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
  if (!user?.id) {
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

      <BlockGrid<UserFollowersQuery, UserFollowersQueryVariables>
        queryField="user"
        contentField="followers"
        queryNode={userFollowersQueryNode}
        id={user.id}
        contentCount={user?.counts?.followers ?? 0}
      />
    </div>
  );
};
