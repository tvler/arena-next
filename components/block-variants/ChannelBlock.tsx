import { useQuery } from "@apollo/client";
import {
  ChannelBlockQuery,
  ChannelBlockQueryVariables,
} from "../../graphql/gen/ChannelBlockQuery";
import { channelBlockQueryNode } from "../../graphql/queries/channelBlock";
import { BlockVariantComponent } from "./types";

export const ChannelBlock: BlockVariantComponent = ({ id, children }) => {
  const channelBlockQuery = useQuery<
    ChannelBlockQuery,
    ChannelBlockQueryVariables
  >(channelBlockQueryNode, {
    variables: {
      id: `${id}`,
    },
    ssr: false,
    fetchPolicy: "cache-only",
  });

  const channel = channelBlockQuery.data?.channel;
  if (!(channel && channel.slug)) {
    return children({
      href: null,
      title: null,
      content: null,
    });
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

  return children({
    href: `/channel/${channel.slug}`,
    title: "title",
    content: (
      <div
        className={"flex-1 flex flex-col items-center" + " " + channelVariants}
      >
        <div className="flex-1"></div>

        <div className="flex flex-col items-center justify-center text-center pl-4 pr-4">
          <span className="leading-5">{channel.title}</span>
          <span className="text-xs mt-1.5">by {channel.owner?.name}</span>
          <span className="text-xs mt-0.5">
            {channel.counts?.contents ?? 0}{" "}
            {channel.counts?.contents === 1 ? "block" : "blocks"}
            {" • "}
            {channel.updated_at}
          </span>
        </div>

        <div className="flex-1"></div>
      </div>
    ),
  });
};
