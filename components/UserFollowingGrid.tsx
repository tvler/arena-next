import { useApolloClient, useQuery } from "@apollo/client";
import { useCallback, useEffect, useRef } from "react";
import IntersectionObserverBox from "./IntersectionObserverBox";
import { UserSsr, UserSsrVariables } from "../graphql/gen/UserSsr";
import userSsr from "../graphql/queries/userSsr";
import Block, { BlockProps, BlockVariant } from "./Block";
import {
  UserFollowing,
  UserFollowingVariables,
  UserFollowing_identity_identifiable_User,
} from "../graphql/gen/UserFollowing";
import userFollowing from "../graphql/queries/userFollowing";

const pageCount = 12;

const getPageNumberFromCellIndex = (cellIndex: number): number => {
  return Math.floor(cellIndex / pageCount) + 1;
};

const UserFollowingGrid: React.FC<{ id: string }> = ({ id }) => {
  const queriedPagesRef = useRef<Set<number>>(new Set());

  const serversideQuery = useQuery<UserSsr, UserSsrVariables>(userSsr, {
    ssr: true,
    variables: { id },
  });
  const user = serversideQuery.data?.identity?.identifiable;

  const { fetchMore, data } = useQuery<UserFollowing, UserFollowingVariables>(
    userFollowing,
    {
      ssr: false,
      variables: {
        id,
        page: 1,
        per: pageCount,
      },
    }
  );

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

  const client = useApolloClient();

  useEffect(() => {
    return () => {
      if (user?.__typename === "User") {
        const normalizedIdentity = client.cache.identify({ ...user });
        if (normalizedIdentity) {
          queriedPagesRef.current = new Set();

          client.cache.evict({
            id: normalizedIdentity,
            fieldName: "following",
          });

          client.cache.gc();
        }
      }
    };
  }, [client, user]);

  if (user?.__typename !== "User") {
    return null;
  }

  const followingCount: number = user.counts?.following ?? 0;
  let following: UserFollowing_identity_identifiable_User["following"] = null;
  if (data?.identity?.identifiable.__typename === "User") {
    following = data?.identity?.identifiable.following;
  }

  return (
    <div className="mt-6 pl-4 pr-4 grid grid-cols-auto-fit-block auto-rows-block gap-4">
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
                variant: BlockVariant.chanel,
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
            skip={!!followingItem}
          />
        );
      })}
    </div>
  );
};

export default UserFollowingGrid;
