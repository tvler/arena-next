import { useQuery } from "@apollo/client";
import {
  ChannelSsrQuery,
  ChannelSsrQueryVariables,
} from "../graphql/gen/ChannelSsrQuery";
import { channelSsrQueryNode } from "../graphql/queries/channelSsr";
import { ChannelContentGrid } from "./ChannelContentGrid";
import { Header } from "./Header";
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

  /*
   * Default
   */

  const channel = channelSsr.data?.channel;

  return (
    <div className="flex flex-col pb-4">
      <Header taxonomy={[channel?.title ?? "channel"]} />

      <Spacer size="8" />

      <ChannelContentGrid id={slug} />
    </div>
  );
};
