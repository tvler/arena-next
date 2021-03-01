import { useQuery } from "@apollo/client";
import {
  ChannelContentQuery,
  ChannelContentQueryVariables,
} from "../graphql/gen/ChannelContentQuery";
import { BlockGrid } from "./BlockGrid";
import {
  ChannelSsrQuery,
  ChannelSsrQueryVariables,
} from "../graphql/gen/ChannelSsrQuery";
import { channelSsrQueryNode } from "../graphql/queries/channelSsr";
import { Header } from "./Header";
import { channelContentQueryNode } from "../graphql/queries/channelContent";
import cx from "classnames";
import { ChannelDetails } from "./ChannelDetails";
import { Spacer } from "./Spacer";

export const ChannelPage: React.FC<{ slug: string }> = ({ slug }) => {
  /*
   * Queries
   */
  const channelSsr = useQuery<ChannelSsrQuery, ChannelSsrQueryVariables>(
    channelSsrQueryNode,
    {
      ssr: true,
      variables: { id: slug },
    }
  );

  /*
   * Early exits
   */

  //  Loading
  if (channelSsr.loading) {
    return (
      <div className="flex flex-col">
        <Header loading />
      </div>
    );
  }

  // Not a channel
  const channel = channelSsr.data?.channel;
  if (!channel?.id) {
    return null;
  }

  /*
   * Default
   */

  return (
    <div className="flex flex-col pb-4">
      <Header
        taxonomy={[
          {
            display: channel?.owner?.name ?? "owner",
            href:
              channel?.owner?.__typename === "User"
                ? channel.owner.slug
                  ? `/user/${channel.owner.slug}`
                  : undefined
                : undefined,
          },
          {
            display: channel?.title ?? "channel",
            color: cx({
              "text-green": channel?.visibility === "public",
              "text-purple": channel?.visibility === "closed",
            }),
          },
        ]}
      />

      <ChannelDetails id={slug} />

      <Spacer size="8" />

      <BlockGrid<ChannelContentQuery, ChannelContentQueryVariables>
        queryField="channel"
        contentField="blokks"
        queryNode={channelContentQueryNode}
        id={channel.id}
        contentCount={channel.counts?.contents ?? 0}
      />
    </div>
  );
};
