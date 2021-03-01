import { useQuery } from "@apollo/client";
import { channelSsrQueryNode } from "../graphql/queries/channelSsr";
import {
  ChannelSsrQuery,
  ChannelSsrQueryVariables,
} from "../graphql/gen/ChannelSsrQuery";
import { ReadMore } from "./ReadMore";

type Props = {
  id: string;
};

const lineHeight = 1.8;
const numberOfLines = 4;
const isOne = (num: number) => num === 1;

export const ChannelDetails: React.FC<Props> = ({ id }) => {
  const serversideQuery = useQuery<ChannelSsrQuery, ChannelSsrQueryVariables>(
    channelSsrQueryNode,
    {
      ssr: true,
      variables: { id },
    }
  );

  const channel = serversideQuery.data?.channel;

  if (!channel) {
    return null;
  }

  const blocks =
    channel.counts?.blocks &&
    `${channel.counts.blocks} ${
      isOne(channel.counts.blocks) ? "block" : "blocks"
    }`;

  const channels =
    channel.counts?.channels &&
    `${channel.counts.channels} ${
      isOne(channel.counts.channels) ? "channel" : "channels"
    }`;

  return (
    <div
      className="flex pl-4 pr-4 text-sm flex-col max-w-md break-word relative items-start"
      style={{ lineHeight }}
    >
      <div className="flex flex-row space-x-3">
        <a>Followers</a>

        <a>Connections</a>
      </div>

      <span>{[channels, blocks].filter((item) => !!item).join(", ")}</span>

      <ReadMore
        lineHeight={lineHeight}
        numberOfLines={numberOfLines}
        html={channel.description}
      />

      <div className="flex flex-row space-x-3">
        <button className="pl-3 pr-3 pt-1 pb-1 rounded-md text-blue bg-blue-light text-base">
          Follow
        </button>

        <button className="pl-3 pr-3 pt-1 pb-1 rounded-md text-gray-darkest bg-gray-light text-base">
          Connect
        </button>
      </div>
    </div>
  );
};
