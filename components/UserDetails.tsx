import { useQuery } from "@apollo/client";
import userSsr from "../graphql/queries/userSsr";
import Link from "next/link";
import { UserSsr, UserSsrVariables } from "../graphql/gen/UserSsr";

type Props = {
  id: string;
};

const UserDetails: React.FC<Props> = ({ id }) => {
  const serversideQuery = useQuery<UserSsr, UserSsrVariables>(userSsr, {
    ssr: true,
    variables: { id },
  });

  if (serversideQuery.data?.identity?.identifiable?.__typename !== "User") {
    return null;
  }

  const user = serversideQuery.data.identity.identifiable;
  const shouldShowFollowing = !!user.counts?.following;
  const shouldShowFollowers = !!user.counts?.followers;

  return (
    <div className="flex flex-row space-x-4 items-start pl-4 pr-4">
      <button className="pl-2.5 pr-2.5 pt-1 pb-1 rounded-md text-blue bg-blue-light">
        Follow
      </button>

      <div className="flex flex-col text-sm leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: user.bio || "" }} />
        <span>
          {user.counts?.channels ?? "0"} channels, {user.counts?.blocks ?? "0"}{" "}
          blocks
        </span>
        <div className="flex flex-row space-x-3">
          {shouldShowFollowers && (
            <Link href={`/user/${id}/followers`}>
              <a>Followers</a>
            </Link>
          )}

          {shouldShowFollowing && (
            <Link href={`/user/${id}/following`}>
              <a>Following</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
