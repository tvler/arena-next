import { useQuery } from "@apollo/client";
import { useCallback, useRef } from "react";
import {
  ChannelContentQuery,
  ChannelContentQueryVariables,
} from "../graphql/gen/ChannelContentQuery";
import {
  ChannelSsrQuery,
  ChannelSsrQueryVariables,
} from "../graphql/gen/ChannelSsrQuery";
import { channelContentQueryNode } from "../graphql/queries/channelContent";
import { channelSsrQueryNode } from "../graphql/queries/channelSsr";
import { Block, BlockProps, BlockVariant } from "./Block";
import { IntersectionObserverBox } from "./IntersectionObserverBox";

const pageCount = 12;

const getPageNumberFromCellIndex = (cellIndex: number): number => {
  return Math.floor(cellIndex / pageCount) + 1;
};

export const ChannelContentGrid: React.FC<{ id: string }> = ({ id }) => {
  const queriedPagesRef = useRef<Set<number>>(new Set());

  const channelSsr = useQuery<ChannelSsrQuery, ChannelSsrQueryVariables>(
    channelSsrQueryNode,
    {
      ssr: true,
      variables: { id: id },
    }
  );
  const channel = channelSsr.data?.channel;

  const { fetchMore, data } = useQuery<
    ChannelContentQuery,
    ChannelContentQueryVariables
  >(channelContentQueryNode, {
    ssr: false,
    variables: {
      id,
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
  const contentCount: number = channel?.counts?.contents ?? 0;
  const content = data?.channel?.blokks;

  return (
    <div className="pl-4 pr-4 grid grid-cols-auto-fit-block auto-rows-block gap-4">
      {Array.from({ length: contentCount }, (_, i) => {
        const contentItem = content && content[i];
        let blockProps: BlockProps = {};

        if (contentItem && contentItem.id !== null) {
          switch (contentItem?.__typename) {
            case "Channel":
              blockProps = {
                id: contentItem.id,
                variant: BlockVariant.channel,
              };
              break;
            case "Image":
              blockProps = {
                id: contentItem.id,
                variant: BlockVariant.image,
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
          }
        }

        return (
          <IntersectionObserverBox
            key={i}
            Component={Block}
            componentProps={blockProps}
            callback={intersectionObserverCallback}
            id={i}
            skip={!!contentItem}
          />
        );
      })}
    </div>
  );
};
