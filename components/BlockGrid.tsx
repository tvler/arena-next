import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useCallback, useMemo, useRef } from "react";
import cx from "classnames";
import { AttachmentBlockFragment } from "../graphql/gen/AttachmentBlockFragment";
import { ChannelBlockFragment } from "../graphql/gen/ChannelBlockFragment";
import { EmbedBlockFragment } from "../graphql/gen/EmbedBlockFragment";
import { GroupBlockFragment } from "../graphql/gen/GroupBlockFragment";
import { ImageBlockFragment } from "../graphql/gen/ImageBlockFragment";
import { LinkBlockFragment } from "../graphql/gen/LinkBlockFragment";
import { PendingBlockFragment } from "../graphql/gen/PendingBlockFragment";
import { TextBlockFragment } from "../graphql/gen/TextBlockFragment";
import { UserBlockFragment } from "../graphql/gen/UserBlockFragment";
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
  | TextBlockFragment
  | ImageBlockFragment
  | EmbedBlockFragment
  | AttachmentBlockFragment
  | LinkBlockFragment
  | PendingBlockFragment;

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

export function BlockGrid<
  TData extends {
    [key in QueryField]:
      | null
      | {
          [key in ContentField]: Array<BlockFragments | null> | null;
        };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  showTitles,
}: {
  queryField: QueryField;
  contentField: ContentField;
  contentCount: number;
  queryNode: DocumentNode;
  id: number;
  showTitles?: boolean;
}): React.ReactElement {
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

  const intersectionObserverOptions = useMemo<IntersectionObserverInit>(
    () => ({ rootMargin: "400px" }),
    []
  );

  const query = data && data[queryField];
  const content = query && query[contentField];

  return (
    <div className="pl-4 pr-4 grid grid-cols-auto-fit-block gap-x-4 gap-y-8 auto-rows-block-with-title single-column:justify-center">
      {Array.from({ length: contentCount }, (_, i) => {
        const contentItem = content && content[i];
        let finalBlockProps: BlockProps;

        if (contentItem && contentItem.id !== null) {
          let blockProps: BlockProps;

          switch (contentItem?.__typename) {
            case "User":
              blockProps = {
                id: contentItem.id,
                variant: BlockVariant.user,
              };
              break;
            case "Channel":
              blockProps = {
                id: contentItem.id,
                variant: BlockVariant.channel,
              };
              break;
            case "Group":
              blockProps = {
                id: contentItem.id,
                variant: BlockVariant.group,
              };
              break;
            case "Text":
              blockProps = {
                id: contentItem.id,
                variant: BlockVariant.text,
              };
              break;
            case "Embed":
              blockProps = {
                id: contentItem.id,
                variant: BlockVariant.embed,
              };
              break;
            case "Attachment":
              blockProps = {
                id: contentItem.id,
                variant: BlockVariant.attachment,
              };
              break;
            case "Link":
              blockProps = {
                id: contentItem.id,
                variant: BlockVariant.link,
              };
              break;
            case "Image":
              blockProps = {
                id: contentItem.id,
                variant: BlockVariant.image,
              };
              break;
            case "PendingBlock":
              blockProps = {};
              break;
          }

          if (showTitles) {
            blockProps.showTitle = true;
          }

          finalBlockProps = blockProps;
        } else {
          finalBlockProps = {};
        }

        return (
          <IntersectionObserverBox
            key={i}
            Component={Block}
            componentProps={finalBlockProps}
            callback={intersectionObserverCallback}
            id={i}
            skip={contentItem !== null && contentItem !== undefined}
            options={intersectionObserverOptions}
          />
        );
      })}
    </div>
  );
}
