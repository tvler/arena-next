import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import IntersectionObserverBox from "./IntersectionObserverBox";
import { UserSsr, UserSsrVariables } from "../graphql/gen/UserSsr";
import userSsr from "../graphql/queries/userSsr";
import Block, { BlockProps, BlockVariant } from "./Block";

const UserFollowingGrid: React.FC<{ id: string }> = ({ id }) => {
  const serversideQuery = useQuery<UserSsr, UserSsrVariables>(userSsr, {
    ssr: true,
    variables: { id },
  });
  const user = serversideQuery.data?.identity?.identifiable;

  const intersectionObserverCallback = useCallback<
    (cellID: number) => (entries: IntersectionObserverEntry[]) => void
  >(
    (cellID) => (entries) => {
      //
    },
    []
  );

  if (user?.__typename !== "User") {
    return null;
  }

  const followingCount: number = user.counts?.following ?? 0;

  return (
    <div className="mt-6 pl-4 pr-4 grid grid-cols-auto-fit-block auto-rows-block gap-4">
      {Array.from({ length: followingCount }, (_, i) => {
        const followingId: null | number = null;

        const blockProps: BlockProps = {};

        return (
          <IntersectionObserverBox
            key={i}
            Component={Block}
            componentProps={blockProps}
            callback={intersectionObserverCallback}
            id={i}
            skip={followingId !== null}
          />
        );
      })}
    </div>
  );
};

export default UserFollowingGrid;
