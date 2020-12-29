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
      <a className="flex-1 flex flex-col items-center no-underline rounded-sm border border-gray bg-white">
        <div className="flex-1 flex items-center text-center">
          <span>{user.name}</span>
        </div>

        <div className="h-1/2 w-1/2 relative flex flex-col items-center justify-center">
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

  let channelVariants: string;
  switch (channel?.visibility) {
    case "closed":
      channelVariants = "text-purple border-purple-light";
      break;
    case "public":
      channelVariants = "text-green border-green-light";
      break;
    default:
      channelVariants = "border-gray";
  }

  // console.log(channel);

  return (
    // <Link href={`/user/${user.slug}`}>
    <a
      className={
        "flex-1 flex flex-col items-center no-underline rounded-sm border bg-white" +
        " " +
        channelVariants
      }
    >
      <div className="flex-1"></div>

      <div className="flex flex-col items-center justify-center text-center pl-4 pr-4">
        <span>{channel.title}</span>
        <span className="text-xs mt-1">by {channel.owner?.name}</span>
        <span className="text-xs mt-1">
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
 * Variant: Null
 */

const NullBlock: React.FC = () => {
  return <div className="flex-1 rounded-sm border border-gray bg-white"></div>;
};

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
    case undefined:
    default:
      variantContent = <NullBlock />;
      break;
  }

  return (
    <div ref={ref} className="flex contain-strict">
      {variantContent}
    </div>
  );
});
Block.displayName = "Block";

export default memo(Block);
