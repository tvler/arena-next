import { forwardRef, memo } from "react";

export type UserFollowingCardProps = {
  id?: number;
};

const UserFollowingCard = forwardRef<HTMLDivElement, UserFollowingCardProps>(
  ({ id }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-white rounded-sm border border-gray flex contain-strict"
      ></div>
    );
  }
);
UserFollowingCard.displayName = "UserFollowingCard";

export default memo(UserFollowingCard);
