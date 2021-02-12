import Link from "next/link";
import { useQuery } from "@apollo/client";
import { memo } from "react";
import {
  UserBlockQuery,
  UserBlockQueryVariables,
} from "../../graphql/gen/UserBlockQuery";
import { userBlockQueryNode } from "../../graphql/queries/userBlock";

export const UserBlock: React.FC<{ id: number }> = memo(({ id }) => {
  const userBlockQuery = useQuery<UserBlockQuery, UserBlockQueryVariables>(
    userBlockQueryNode,
    {
      variables: {
        id: `${id}`,
      },
      ssr: false,
      fetchPolicy: "cache-only",
    }
  );

  const user = userBlockQuery.data?.user;
  if (!(user && user.slug)) {
    return null;
  }

  return (
    <Link href={`/user/${user.slug}`}>
      <a className="flex-1 flex flex-col items-center no-underline">
        <div className="flex-1 flex items-center text-center">
          <span className="text-gray-darkest">{user.name}</span>
        </div>

        <div className="h-1/2 w-1/2 relative flex flex-col items-center justify-center bg-gray-light">
          <span className="text-2xl text-gray-dark">{user.initials}</span>

          {user.avatar && (
            <img
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full object-contain"
              src={user.avatar}
              alt={`${user.name ?? "User"}'s profile picture`}
            />
          )}
        </div>

        <div className="flex-1"></div>
      </a>
    </Link>
  );
});
