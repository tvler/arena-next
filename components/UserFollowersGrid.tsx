import { useQuery, useApolloClient } from "@apollo/client";
import { useCallback, useEffect, useRef } from "react";
import IntersectionObserverBox from "./IntersectionObserverBox";
import { UserSsr, UserSsrVariables } from "../graphql/gen/UserSsr";
import userSsr from "../graphql/queries/userSsr";
import userFollowers from "../graphql/queries/userFollowers";
import {
  UserFollowers,
  UserFollowersVariables,
} from "../graphql/gen/UserFollowers";
import { UserFollowers_identity_identifiable_User } from "../graphql/gen/UserFollowers";
import Block, { BlockProps, BlockVariant } from "./Block";

const pageCount = 12;

const getPageNumberFromCellIndex = (cellIndex: number): number => {
  return Math.floor(cellIndex / pageCount) + 1;
};

const UserFollowersGrid: React.FC<{ id: string }> = ({ id }) => {
  const queriedPagesRef = useRef<Set<number>>(new Set());

  const serversideQuery = useQuery<UserSsr, UserSsrVariables>(userSsr, {
    ssr: true,
    variables: { id },
  });
  const user = serversideQuery.data?.identity?.identifiable;

  const { fetchMore, data } = useQuery<UserFollowers, UserFollowersVariables>(
    userFollowers,
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
            fieldName: "followers",
          });

          client.cache.gc();
        }
      }
    };
  }, [client, user]);

  if (user?.__typename !== "User") {
    return null;
  }

  const followsCount: number = user.counts?.followers ?? 0;
  let followers: UserFollowers_identity_identifiable_User["followers"] = null;
  if (data?.identity?.identifiable.__typename === "User") {
    followers = data?.identity?.identifiable.followers;
  }

  return (
    <div className="mt-6 pl-4 pr-4 grid grid-cols-auto-fit-block auto-rows-block gap-4">
      {Array.from({ length: followsCount }, (_, i) => {
        let followerId: null | number = null;
        if (followers) {
          followerId = followers[i]?.id ?? null;
        }

        const blockProps: BlockProps = followerId
          ? {
              variant: BlockVariant.user,
              id: followerId,
            }
          : {};

        return (
          <IntersectionObserverBox
            key={i}
            Component={Block}
            componentProps={blockProps}
            callback={intersectionObserverCallback}
            id={i}
            skip={followerId !== null}
          />
        );
      })}
    </div>
  );
};

export default UserFollowersGrid;
