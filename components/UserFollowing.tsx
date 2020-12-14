import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import userSsr from "../graphql/queries/userSsr";
import Header from "./Header";
import UserDetails from "./UserDetails";

const UserFollowing: React.FC = () => {
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
  const followingCount: number = user.counts?.following ?? 0;

  return (
    <div className="flex flex-col pb-4">
      <Header
        taxonomy={[
          { display: user.name ?? "User", href: `/user/${id}` },
          "Following",
        ]}
      />

      <UserDetails id={id} />

      <div className="mt-6 pl-4 pr-4 grid grid-cols-auto-fit-block auto-rows-block gap-4">
        {Array.from({ length: followingCount }, (_, i) => {
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

export default UserFollowing;
