/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useRef } from "react";
import {
  UserFollowingQuery,
  UserFollowingQueryVariables,
  UserFollowingQuery_user,
} from "../graphql/gen/UserFollowingQuery";
import { userFollowingQueryNode } from "../graphql/queries/userFollowing";

type SubType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
  }[keyof Base]
>;

type NonNullableRecord<T> = {
  [key in keyof T]: NonNullable<T[key]>;
};

type BlockTypename = "User" | "Channel" | "Group";

type A = NonNullableRecord<UserFollowingQuery_user>;

type Test = keyof SubType<
  NonNullableRecord<UserFollowingQuery_user>,
  Array<{ __typename: BlockTypename } | null>
>;

type BlockType = {
  __typename: BlockTypename;
};

const pageCount = 12;

const getPageNumberFromCellIndex = (cellIndex: number): number => {
  return Math.floor(cellIndex / pageCount) + 1;
};

type QueryVariables = {
  id: string;
  page: number;
  per: number;
};

export function Grid<
  TData extends {
    [queryKey: QueryField]:
      | null
      | ({
          [contentKey in ContentField]: Array<BlockType | null>;
        } &
          { [key in string]: unknown });
  },
  TVariables extends QueryVariables,
  QueryField extends keyof TData = string | number,
  ContentField extends string | number | symbol = keyof SubType<
    NonNullableRecord<NonNullable<TData[QueryField]>>,
    Array<{ __typename: BlockTypename } | null>
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

  const query = data && data[queryField];
  const content = query && query[contentField];
  if (Array.isArray(content)) {
    console.log(content);
  }
  // if (query) {
  //   const field = query[contentField];
  //   console.log();
  // }
  return null;
}

export const test = (
  <Grid<{ user: { following: []; lol: true } }, UserFollowingQueryVariables>
    contentCount={20}
    queryField="user"
    contentField="following"
    queryNode={userFollowingQueryNode}
    id={123}
  />
);

type C = {
  n: number;
  s: string;
};

type D = keyof SubType<C, number>;

const d: D = "n";
const c: C = {
  n: 123,
  s: "",
};

const n = c[d];

function lol<
  TData extends Record<string, unknown>,
  NumberKey extends keyof SubType<TData, number> = keyof SubType<TData, number>
>(numberKey: NumberKey) {
  const test: TData = {};
  return null;
}

lol<C>("n");
