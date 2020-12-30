import Link from "next/link";
import { forwardRef, memo } from "react";
import { useQuery } from "@apollo/client";
import { UserCard, UserCardVariables } from "../graphql/gen/UserCard";
import userCard from "../graphql/queries/userCard";
import {
  ChannelBlock,
  ChannelBlockVariables,
} from "../graphql/gen/ChannelBlock";
import channelBlock from "../graphql/queries/channelBlock";

/*
 * Types of blocks that can be rendered
 */

export enum BlockVariant {
  user,
  chanel,
  group,
}

/*
 * Block props. Don't add a variant to a block to render a null state.
 */

export type BlockProps =
  | {
      id: number;
      variant: BlockVariant;
    }
  | {
      id?: undefined;
      variant?: undefined;
    };

/*
 * Variant: User
 */

const UserBlock: React.FC<{ id: number }> = memo(({ id }) => {
  const userCardQuery = useQuery<UserCard, UserCardVariables>(userCard, {
    variables: {
      id: `${id}`,
    },
    ssr: false,
    fetchPolicy: "cache-only",
  });

  const user = userCardQuery.data?.user;
  if (!(user && user.slug)) {
    return null;
  }

  return (
    <Link href={`/user/${user.slug}`}>
      <a className="flex-1 flex flex-col items-center no-underline">
        <div className="flex-1 flex items-center text-center">
          <span>{user.name}</span>
        </div>

        <div className="h-1/2 w-1/2 relative flex flex-col items-center justify-center bg-gray-light">
          <span className="text-2xl">{user.initials}</span>

          {user.avatar && (
            <img
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full object-contain"
              src={user.avatar}
              alt={`${user.name ?? "User"}'s profile picture`}
            />
          )}
        </div>

        <div className="flex-1"></div>
      </a>
    </Link>
  );
});

/*
 * Variant: Channel
 */

const ChannelBlockVariant: React.FC<{ id: number }> = memo(({ id }) => {
  const channelBlockQuery = useQuery<ChannelBlock, ChannelBlockVariables>(
    channelBlock,
    {
      variables: {
        id: `${id}`,
      },
      ssr: false,
      fetchPolicy: "cache-only",
    }
  );

  const channel = channelBlockQuery.data?.channel;
  if (!(channel && channel.slug)) {
    return null;
  }

  let channelVariants = "";
  switch (channel?.visibility) {
    case "closed":
      channelVariants = "text-purple";
      break;
    case "public":
      channelVariants = "text-green";
      break;
  }

  return (
    // <Link href={`/user/${user.slug}`}>
    <a
      className={
        "flex-1 flex flex-col items-center no-underline" + " " + channelVariants
      }
    >
      <div className="flex-1"></div>

      <div className="flex flex-col items-center justify-center text-center pl-4 pr-4">
        <span className="leading-5">{channel.title}</span>
        <span className="text-xs mt-2.5">by {channel.owner?.name}</span>
        <span className="text-xs mt-0.5">
          {channel.counts?.contents ?? 0}{" "}
          {channel.counts?.contents === 1 ? "block" : "blocks"}
          {" • "}
          {channel.updated_at}
        </span>
      </div>

      <div className="flex-1"></div>
    </a>
    // </Link>
  );
});

/*
 * Variant: Group
 */

const GroupBlock: React.FC = memo(() => {
  return (
    <div className="flex items-center justify-center flex-1">
      <span className="transform -rotate-45">
        Groups not implemented yet!!!
      </span>
    </div>
  );
});

/*
 * Variant: Null
 */

const NullBlock: React.FC = memo(() => {
  return <div className="flex-1"></div>;
});

/*
 * The final block component
 */

const Block = forwardRef<HTMLDivElement, BlockProps>((props, ref) => {
  let variantContent: React.ReactNode = null;
  switch (props.variant) {
    case BlockVariant.user:
      variantContent = <UserBlock id={props.id} />;
      break;
    case BlockVariant.chanel:
      variantContent = <ChannelBlockVariant id={props.id} />;
      break;
    case BlockVariant.group:
      variantContent = <GroupBlock />;
      break;
    default:
      variantContent = <NullBlock />;
      break;
  }

  return (
    <div
      ref={ref}
      className="flex contain-strict rounded-sm border border-gray bg-white"
    >
      {variantContent}
    </div>
  );
});

export default memo(Block);
