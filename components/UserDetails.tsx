import { useQuery } from "@apollo/client";
import { userSsrQueryNode } from "../graphql/queries/userSsr";
import Link from "next/link";
import {
  UserSsrQuery,
  UserSsrQueryVariables,
} from "../graphql/gen/UserSsrQuery";
import { useEffect, useRef, useState } from "react";
import cx from "classnames";

type Props = {
  id: string;
};

const lineHeight = 1.8;
const numberOfLines = 2;

export const UserDetails: React.FC<Props> = ({ id }) => {
  const bigRef = useRef<HTMLDivElement>(null);
  const smallRef = useRef<HTMLDivElement>(null);
  const [shouldShowReadMore, setShouldShowReadMore] = useState(false);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (bigRef.current && smallRef.current) {
      const smallHeight = Math.round(
        smallRef.current.getBoundingClientRect().height
      );
      const bigHeight = Math.round(
        bigRef.current.getBoundingClientRect().height
      );

      if (bigHeight > smallHeight) {
        setShouldShowReadMore(true);
      }
    }
  }, []);

  const serversideQuery = useQuery<UserSsrQuery, UserSsrQueryVariables>(
    userSsrQueryNode,
    {
      ssr: true,
      variables: { id },
    }
  );

  if (serversideQuery.data?.identity?.identifiable?.__typename !== "User") {
    return null;
  }

  const user = serversideQuery.data.identity.identifiable;
  const shouldShowFollowing = !!user.counts?.following;
  const shouldShowFollowers = !!user.counts?.followers;

  return (
    <div
      style={{ lineHeight }}
      className="flex pl-4 pr-4 text-sm flex-col max-w-md break-word relative items-start"
    >
      <div className="flex flex-row space-x-3">
        {shouldShowFollowers && (
          <Link href={`/user/${id}/followers`}>
            <a>Followers</a>
          </Link>
        )}

        {shouldShowFollowing && (
          <Link href={`/user/${id}/following`}>
            <a>Following</a>
          </Link>
        )}
      </div>

      <span>
        {user.counts?.channels ?? "0"} channels, {user.counts?.blocks ?? "0"}{" "}
        blocks
      </span>

      <div
        ref={smallRef}
        style={
          !readMore
            ? { maxHeight: `${lineHeight * numberOfLines}em` }
            : undefined
        }
        className="overflow-hidden"
      >
        <div
          ref={bigRef}
          dangerouslySetInnerHTML={{ __html: user.bio || "" }}
        />
      </div>

      <button
        className={cx(
          "text-left text-gray-dark animate-ellipses-loader animation-iteration-1",
          !readMore && shouldShowReadMore ? "visible" : "invisible"
        )}
        title="Read more"
        onClick={() => {
          setReadMore(true);
        }}
      >
        <span className="transform rotate-180 inline-block">…</span>
      </button>

      <button className="pl-3 pr-3 pt-1 pb-1 rounded-md text-blue bg-blue-light text-base">
        Follow
      </button>
    </div>
  );
};
