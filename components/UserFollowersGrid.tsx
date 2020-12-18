import { useQuery } from "@apollo/client";
import { useCallback, useMemo, useRef } from "react";
import IntersectionObserverBox from "./IntersectionObserverBox";
import { UserSsr, UserSsrVariables } from "../graphql/gen/UserSsr";
import userSsr from "../graphql/queries/userSsr";
import userFollowers from "../graphql/queries/userFollowers";
import UserFollowersCard, { UserFollowersCardProps } from "./UserFollowersCard";
import {
  UserFollowers,
  UserFollowersVariables,
} from "../graphql/gen/UserFollowers";
import { UserFollowers_identity_identifiable_User } from "../graphql/gen/UserFollowers";

const pageCount = 12;

const getPageNumberFromCellIndex = (cellIndex: number): number => {
  return Math.floor(cellIndex / pageCount) + 1;
};

const UserFollowersGrid: React.FC<{ id: string }> = ({ id }) => {
  const queriedPagesRef = useRef<Set<number>>(new Set([1]));

  const serversideQuery = useQuery<UserSsr, UserSsrVariables>(userSsr, {
    ssr: true,
    variables: { id },
  });

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
        if (entry.isIntersecting) {
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

  if (serversideQuery.data?.identity?.identifiable?.__typename !== "User") {
    return null;
  }

  const user = serversideQuery.data.identity.identifiable;
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

        const userFollowersCardProps: UserFollowersCardProps = {
          id: followerId ?? undefined,
        };

        const key = followerId ? `id${followerId}` : `index${i}`;

        return (
          <IntersectionObserverBox
            key={key}
            Component={UserFollowersCard}
            callback={intersectionObserverCallback}
            id={i}
            props={userFollowersCardProps}
            skip={followerId !== null}
          />
        );
      })}
    </div>
  );
};

export default UserFollowersGrid;
