import { useQuery } from "@apollo/client";
import { forwardRef } from "react";
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
    });

    if (id) {
      console.log(userCardQuery.data?.user);
    }

    return (
      <div ref={ref} className="bg-white rounded-sm border border-gray"></div>
    );
  }
);
UserFollowersCard.displayName = "UserFollowersCard";

export default UserFollowersCard;
