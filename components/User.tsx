import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import userSsr from "../graphql/queries/userSsr";
import Link from "next/link";
import Header from "./Header";

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
        <Header
          taxonomy={[
            {
              key: "loading",
              display: (
                <span className="animate-ellipses-loader not-italic">…</span>
              ),
            },
          ]}
        />
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

      <div className="flex flex-row space-x-4 items-start pl-4 pr-4">
        <button
          style={{ backgroundColor: "#E2ECFF", color: "#3B5998" }}
          className="pl-2.5 pr-2.5 pt-1 pb-1 rounded-md"
        >
          Follow
        </button>

        <div className="flex flex-col text-sm leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: user.bio || "" }} />
          <span>
            {user.counts?.channels ?? "0"} channels,{" "}
            {user.counts?.blocks ?? "0"} blocks
          </span>
          <div className="flex flex-row space-x-3">
            <Link href={`/user/${id}/followers`}>
              <a>Followers</a>
            </Link>

            <Link href={`/user/${id}/following`}>
              <a>Following</a>
            </Link>
          </div>
        </div>
      </div>

      {/* {JSON.stringify(user)} */}
    </div>
  );
};

export default User;
