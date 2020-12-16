import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { UserSsr, UserSsrVariables } from "../graphql/gen/UserSsr";
import userSsr from "../graphql/queries/userSsr";
import Header from "./Header";
import UserDetails from "./UserDetails";

const UserFollowersPage: React.FC = () => {
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
  const followersCount: number = user.counts?.followers ?? 0;

  return (
    <div className="flex flex-col pb-4">
      <Header
        taxonomy={[
          { display: user.name ?? "User", href: `/user/${id}` },
          "Followers",
        ]}
      />

      <UserDetails id={id} />

      <div className="mt-6 pl-4 pr-4 grid grid-cols-auto-fit-block auto-rows-block gap-4">
        {Array.from({ length: followersCount }, (_, i) => {
          return (
            <div
              key={i}
              className="bg-white rounded-sm border border-gray"
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default UserFollowersPage;
