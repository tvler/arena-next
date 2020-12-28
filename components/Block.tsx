import Link from "next/link";
import { forwardRef, memo } from "react";
import cx from "classnames";
import { useQuery } from "@apollo/client";
import { UserCard, UserCardVariables } from "../graphql/gen/UserCard";
import userCard from "../graphql/queries/userCard";

/*
 * Types of blocks that can be rendered
 */

export enum BlockVariant {
  user,
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

const UserBlock: React.FC<{ id: number }> = ({ id }) => {
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
};

/*
 * The final block component
 */

const Block = forwardRef<HTMLDivElement, BlockProps>((props, ref) => {
  let variantClasses: string | undefined = undefined;
  switch (props.variant) {
    case undefined:
    case BlockVariant.user: {
      variantClasses = "border-gray bg-white";
    }
  }

  let variantContent: React.ReactNode = null;
  if (props.variant === BlockVariant.user) {
    variantContent = <UserBlock id={props.id} />;
  }

  return (
    <div
      ref={ref}
      className={cx("rounded-sm border flex contain-strict", variantClasses)}
    >
      {variantContent}
    </div>
  );
});
Block.displayName = "Block";

export default memo(Block);
