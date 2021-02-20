/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useCallback, useRef } from "react";
import { ChannelBlockFragment } from "../graphql/gen/ChannelBlockFragment";
import { GroupBlockFragment } from "../graphql/gen/GroupBlockFragment";
import { TextBlockFragment } from "../graphql/gen/TextBlockFragment";
import { UserBlockFragment } from "../graphql/gen/UserBlockFragment";
import {
  UserFollowingQuery,
  UserFollowingQueryVariables,
  UserFollowingQuery_user,
} from "../graphql/gen/UserFollowingQuery";
import { userFollowingQueryNode } from "../graphql/queries/userFollowing";
import { Block, BlockProps, BlockVariant } from "./Block";
import { IntersectionObserverBox } from "./IntersectionObserverBox";

/*
 * Types
 */

type SubType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
  }[keyof Base]
>;

type NonNullableRecord<T> = {
  [key in keyof T]: NonNullable<T[key]>;
};

type QueryVariables = {
  id: string;
  page: number;
  per: number;
};

type BlockFragments =
  | UserBlockFragment
  | ChannelBlockFragment
  | GroupBlockFragment
  | TextBlockFragment;

/*
 * Utils
 */

const pageCount = 12;

const getPageNumberFromCellIndex = (cellIndex: number): number => {
  return Math.floor(cellIndex / pageCount) + 1;
};

/*
 * Component
 */

export function Grid<
  TData extends {
    [key in QueryField]:
      | null
      | {
          [key in ContentField]: Array<BlockFragments | null> | null;
        };
  },
  TVariables extends QueryVariables,
  QueryField extends string | number | symbol = keyof TData,
  ContentField extends string | number | symbol = keyof SubType<
    NonNullableRecord<NonNullable<TData[QueryField]>>,
    Array<BlockFragments | null>
  >
>({
  contentCount,
  contentField,
  queryNode,
  id,
  queryField,
}: {
  queryField: QueryField;
  contentField: ContentField;
  contentCount: number;
  queryNode: DocumentNode;
  id: number;
}): React.ReactElement | null {
  const queriedPagesRef = useRef<Set<number>>(new Set());

  const { fetchMore, data } = useQuery<TData, QueryVariables>(queryNode, {
    ssr: false,
    variables: {
      id: id.toString(),
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

  const query = data && data[queryField];
  const content = query && query[contentField];

  return (
    <div className="pl-4 pr-4 grid grid-cols-auto-fit-block auto-rows-block gap-4">
      {Array.from({ length: contentCount }, (_, i) => {
        const followingItem = content && content[i];
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
}

export const test = (
  <Grid<UserFollowingQuery, UserFollowingQueryVariables>
    contentCount={20}
    queryField="user"
    contentField="following"
    queryNode={userFollowingQueryNode}
    id={123}
  />
);
