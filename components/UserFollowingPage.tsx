import { useQuery } from "@apollo/client";
import {
  UserFollowingQuery,
  UserFollowingQueryVariables,
} from "../graphql/gen/UserFollowingQuery";
import {
  UserSsrQuery,
  UserSsrQueryVariables,
} from "../graphql/gen/UserSsrQuery";
import { userFollowingQueryNode } from "../graphql/queries/userFollowing";
import { userSsrQueryNode } from "../graphql/queries/userSsr";
import { BlockGrid } from "./BlockGrid";
import { Header } from "./Header";
import { Spacer } from "./Spacer";
import { UserDetails } from "./UserDetails";

type Props = {
  slug: string;
};

export const UserFollowingPage: React.FC<Props> = ({ slug }) => {
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
          "Following",
        ]}
      />

      <UserDetails id={slug} />

      <Spacer size="8" />

      <BlockGrid<UserFollowingQuery, UserFollowingQueryVariables>
        queryField="user"
        contentField="following"
        queryNode={userFollowingQueryNode}
        id={user.id}
        contentCount={user?.counts?.following ?? 0}
      />
    </div>
  );
};
