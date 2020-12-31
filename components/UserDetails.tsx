import { useQuery } from "@apollo/client";
import userSsr from "../graphql/queries/userSsr";
import Link from "next/link";
import { UserSsr, UserSsrVariables } from "../graphql/gen/UserSsr";
import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  id: string;
};

const lineHeight = 1.625;
const numberOfLines = 3;

const UserDetails: React.FC<Props> = ({ id }) => {
  const bigRef = useRef<HTMLDivElement>(null);
  const smallRef = useRef<HTMLDivElement>(null);
  const [shouldShowReadMore, setShouldShowReadMore] = useState(false);
  const [readMore, setReadMore] = useState(false);

  useLayoutEffect(() => {
    if (bigRef.current && smallRef.current) {
      const smallHeight = smallRef.current.getBoundingClientRect().height;
      const bigHeight = bigRef.current.getBoundingClientRect().height;

      if (bigHeight > smallHeight) {
        setShouldShowReadMore(true);
      }
    }
  }, []);

  const serversideQuery = useQuery<UserSsr, UserSsrVariables>(userSsr, {
    ssr: true,
    variables: { id },
  });

  if (serversideQuery.data?.identity?.identifiable?.__typename !== "User") {
    return null;
  }

  const user = serversideQuery.data.identity.identifiable;
  const shouldShowFollowing = !!user.counts?.following;
  const shouldShowFollowers = !!user.counts?.followers;

  return (
    <div className="flex flex-row space-x-3 items-start pl-4 pr-4">
      <button className="pl-2.5 pr-2.5 pt-1 pb-1 rounded-md text-blue bg-blue-light">
        Follow
      </button>

      <div
        className="flex flex-col text-sm -mt-0.5 max-w-md break-word relative"
        style={{ lineHeight }}
      >
        {/* Render the expanded description not visible outside of the flow */}
        <div
          ref={bigRef}
          dangerouslySetInnerHTML={{ __html: user.bio || "" }}
          className="absolute pointer-events-none opacity-0"
        />

        {/* Render the minified description not visible outside of the flow */}
        <div
          ref={smallRef}
          style={{ maxHeight: `${lineHeight * numberOfLines}em` }}
          dangerouslySetInnerHTML={{ __html: user.bio || "" }}
          className="absolute pointer-events-none opacity-0 overflow-hidden"
        />

        {/* The actually rendered description */}
        <div
          style={
            !readMore && shouldShowReadMore
              ? { maxHeight: `${lineHeight * (numberOfLines - 1)}em` }
              : undefined
          }
          dangerouslySetInnerHTML={{ __html: user.bio || "" }}
          className="overflow-hidden"
        />

        {!readMore && shouldShowReadMore && (
          <button
            className="text-left text-gray-light"
            title="Read more"
            onClick={() => {
              setReadMore(true);
            }}
          >
            …
          </button>
        )}

        <span>
          {user.counts?.channels ?? "0"} channels, {user.counts?.blocks ?? "0"}{" "}
          blocks
        </span>
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
      </div>
    </div>
  );
};

export default UserDetails;
