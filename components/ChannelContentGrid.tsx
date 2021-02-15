import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import {
  ChannelSsrQuery,
  ChannelSsrQueryVariables,
} from "../graphql/gen/ChannelSsrQuery";
import { channelSsrQueryNode } from "../graphql/queries/channelSsr";
import { Block, BlockProps } from "./Block";
import { IntersectionObserverBox } from "./IntersectionObserverBox";

export const ChannelContentGrid: React.FC<{ id: string }> = ({ id }) => {
  const channelSsr = useQuery<ChannelSsrQuery, ChannelSsrQueryVariables>(
    channelSsrQueryNode,
    {
      ssr: true,
      variables: { id: id },
    }
  );
  const intersectionObserverCallback = useCallback<
    (cellID: number) => (entries: IntersectionObserverEntry[]) => void
  >(
    (cellID) => (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          // console.log("ok");
        }
      }
    },
    []
  );
  const channel = channelSsr.data?.channel;
  const contentCount: number = channel?.counts?.contents ?? 0;

  return (
    <div className="pl-4 pr-4 grid grid-cols-auto-fit-block auto-rows-block gap-4">
      {Array.from({ length: contentCount }, (_, i) => {
        // const followingItem = following && following[i];
        let blockProps: BlockProps = {};

        // if (followingItem && followingItem.id !== null) {
        //   switch (followingItem?.__typename) {
        //     case "User":
        //       blockProps = {
        //         id: followingItem.id,
        //         variant: BlockVariant.user,
        //       };
        //       break;
        //     case "Channel":
        //       blockProps = {
        //         id: followingItem.id,
        //         variant: BlockVariant.channel,
        //       };
        //       break;
        //     case "Group":
        //       blockProps = {
        //         id: followingItem.id,
        //         variant: BlockVariant.group,
        //       };
        //       break;
        //   }
        // }

        return (
          <IntersectionObserverBox
            key={i}
            Component={Block}
            componentProps={blockProps}
            callback={intersectionObserverCallback}
            id={i}
            // skip={!!followingItem}
          />
        );
      })}
    </div>
  );
};
