import { useQuery } from "@apollo/client";
import {
  UserSsrQuery,
  UserSsrQueryVariables,
} from "../graphql/gen/UserSsrQuery";
import { userSsrQueryNode } from "../graphql/queries/userSsr";
import { Header } from "./Header";
import { UserDetails } from "./UserDetails";

type Props = {
  slug: string;
};

export const UserPage: React.FC<Props> = ({ slug }) => {
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

  /*
   * Default
   */

  const user = serversideQuery.data?.user;

  return (
    <div className="flex flex-col pb-4">
      <Header taxonomy={[user?.name ?? "user"]} />

      <UserDetails id={slug} />
    </div>
  );
};
