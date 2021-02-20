import { useQuery } from "@apollo/client";
import { useCallback, useRef } from "react";
import { IntersectionObserverBox } from "./IntersectionObserverBox";
import {
  UserSsrQuery,
  UserSsrQueryVariables,
} from "../graphql/gen/UserSsrQuery";
import { userSsrQueryNode } from "../graphql/queries/userSsr";
import { Block, BlockProps, BlockVariant } from "./Block";
import {
  UserFollowingQuery,
  UserFollowingQueryVariables,
} from "../graphql/gen/UserFollowingQuery";
import { userFollowingQueryNode } from "../graphql/queries/userFollowing";

const pageCount = 12;

const getPageNumberFromCellIndex = (cellIndex: number): number => {
  return Math.floor(cellIndex / pageCount) + 1;
};

export const UserFollowingGrid: React.FC<{ id: string }> = ({ id }) => {
  const queriedPagesRef = useRef<Set<number>>(new Set());

  const serversideQuery = useQuery<UserSsrQuery, UserSsrQueryVariables>(
    userSsrQueryNode,
    {
      ssr: true,
      variables: { id },
    }
  );
  const user = serversideQuery.data?.user;

  const { fetchMore, data } = useQuery<
    UserFollowingQuery,
    UserFollowingQueryVariables
  >(userFollowingQueryNode, {
    ssr: false,
    variables: {
      id,
      page: 1,
      per: pageCount,
    },
  });

  const intersectionObserverCallback = useCallback<
    (cellID: number) => (entries: IntersectionObserverEntry[]) => void
  >(
    (cellID) => (entries) => {
      for (const entry of entries) {
        if (
          entry.isIntersecting &&
          fetchMore // sometimes fetchMore is undefined during hot reload
        ) {
          const page = getPageNumberFromCellIndex(cellID);
          if (!queriedPagesRef.current.has(page)) {
            queriedPagesRef.current.add(page);
            fetchMore({
              variables: {
                page,
              },
            });
          }
        }
      }
    },
    [fetchMore]
  );

  if (user?.__typename !== "User") {
    return null;
  }

  const followingCount: number = user.counts?.following ?? 0;
  const following = data?.user?.following;

  return (
    <div className="pl-4 pr-4 grid grid-cols-auto-fit-block auto-rows-block gap-4">
      {Array.from({ length: followingCount }, (_, i) => {
        const followingItem = following && following[i];
        let blockProps: BlockProps = {};

        if (followingItem && followingItem.id !== null) {
          switch (followingItem?.__typename) {
            case "User":
              blockProps = {
                id: followingItem.id,
                variant: BlockVariant.user,
              };
              break;
            case "Channel":
              blockProps = {
                id: followingItem.id,
                variant: BlockVariant.channel,
              };
              break;
            case "Group":
              blockProps = {
                id: followingItem.id,
                variant: BlockVariant.group,
              };
              break;
          }
        }

        return (
          <IntersectionObserverBox
            key={i}
            Component={Block}
            componentProps={blockProps}
            callback={intersectionObserverCallback}
            id={i}
            skip={followingItem !== null && followingItem !== undefined}
          />
        );
      })}
    </div>
  );
};
