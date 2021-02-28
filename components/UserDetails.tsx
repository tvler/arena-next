import { useQuery } from "@apollo/client";
import { userSsrQueryNode } from "../graphql/queries/userSsr";
import Link from "next/link";
import {
  UserSsrQuery,
  UserSsrQueryVariables,
} from "../graphql/gen/UserSsrQuery";
import { ReadMore } from "./ReadMore";

type Props = {
  id: string;
};

const lineHeight = 1.8;
const numberOfLines = 2;

export const UserDetails: React.FC<Props> = ({ id }) => {
  const serversideQuery = useQuery<UserSsrQuery, UserSsrQueryVariables>(
    userSsrQueryNode,
    {
      ssr: true,
      variables: { id },
    }
  );

  const user = serversideQuery.data?.user;

  if (!user) {
    return null;
  }

  const shouldShowFollowing = !!user.counts?.following;
  const shouldShowFollowers = !!user.counts?.followers;

  return (
    <div
      className="flex pl-4 pr-4 text-sm flex-col max-w-md break-word relative items-start"
      style={{ lineHeight }}
    >
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

      <span>
        {user.counts?.channels ?? "0"} channels, {user.counts?.blocks ?? "0"}{" "}
        blocks
      </span>

      <ReadMore
        lineHeight={lineHeight}
        numberOfLines={numberOfLines}
        html={user.bio}
      />

      <button className="pl-3 pr-3 pt-1 pb-1 rounded-md text-blue bg-blue-light text-base">
        Follow
      </button>
    </div>
  );
};
