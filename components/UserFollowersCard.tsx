import Link from "next/link";
import { useQuery } from "@apollo/client";
import { forwardRef, memo } from "react";
import { UserCard, UserCardVariables } from "../graphql/gen/UserCard";
import userCard from "../graphql/queries/userCard";

export type UserFollowersCardProps = {
  id?: number;
};

const UserFollowersCard = forwardRef<HTMLDivElement, UserFollowersCardProps>(
  ({ id }, ref) => {
    const userCardQuery = useQuery<UserCard, UserCardVariables>(userCard, {
      variables: {
        id: `${id}`,
      },
      skip: id === undefined,
      ssr: false,
      fetchPolicy: "cache-only",
    });

    let content: React.ReactNode = null;
    const user = userCardQuery.data?.user;
    if (user && user.slug) {
      content = (
        <Link href={`/user/${user.slug}`}>
          <a className="flex-1 flex flex-col items-center no-underline">
            <div className="flex-1 flex items-center text-center">
              <span>{user.name}</span>
            </div>

            <div className="h-1/2 w-1/2 relative flex flex-col items-center justify-center">
              <span className="text-2xl">{user.initials}</span>

              {user.avatar && (
                <img
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
    }

    return (
      <div
        ref={ref}
        className="bg-white rounded-sm border border-gray flex contain-strict"
      >
        {content}
      </div>
    );
  }
);
UserFollowersCard.displayName = "UserFollowersCard";

export default memo(UserFollowersCard);
