import { useQuery } from "@apollo/client";
import { forwardRef, useCallback } from "react";
import IntersectionObserverBox from "./IntersectionObserverBox";
import { UserSsr, UserSsrVariables } from "../graphql/gen/UserSsr";
import userSsr from "../graphql/queries/userSsr";

const UserFollowersGrid: React.FC<{ id: string }> = ({ id }) => {
  const serversideQuery = useQuery<UserSsr, UserSsrVariables>(userSsr, {
    ssr: true,
    variables: { id },
  });

  const intersectionObserverCallback = useCallback<
    (cellID: number) => (entries: IntersectionObserverEntry[]) => void
  >(
    (cellID) => (entries) => {
      console.log(cellID);
    },
    []
  );

  if (serversideQuery.data?.identity?.identifiable?.__typename !== "User") {
    return null;
  }

  const user = serversideQuery.data.identity.identifiable;
  const followsCount: number = user.counts?.followers ?? 0;

  return (
    <div className="mt-6 pl-4 pr-4 grid grid-cols-auto-fit-block auto-rows-block gap-4">
      {Array.from({ length: followsCount }, (_, i) => {
        return (
          <IntersectionObserverBox
            key={i}
            Component={Card}
            callback={intersectionObserverCallback}
            id={i}
            props={{}}
          />
        );
      })}
    </div>
  );
};

const Card = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className="bg-white rounded-sm border border-gray"></div>
  );
});
Card.displayName = "Card";

export default UserFollowersGrid;
