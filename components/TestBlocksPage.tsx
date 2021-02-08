import { Cache } from "@apollo/client";
import { Block, BlockVariant } from "./Block";
import { userCardFragmentNode } from "../graphql/fragments/UserCardFragment";
import { UserCardFragment } from "../graphql/gen/UserCardFragment";
import { MockFragment } from "./MockFragment";
import { ChannelBlockFragment } from "../graphql/gen/ChannelBlockFragment";
import { channelBlockFragmentNode } from "../graphql/fragments/ChannelBlockFragment";
import { GroupBlockFragment } from "../graphql/gen/GroupBlockFragment";
import { groupBlockFragmentNode } from "../graphql/fragments/GroupBlockFragment";

const userFragment: Cache.WriteFragmentOptions<UserCardFragment, null> = {
  fragment: userCardFragmentNode,
  data: {
    __typename: "User",
    id: 123,
    name: "Tyler Deitz",
    slug: "are-na",
    initials: "TD",
    avatar: null,
  },
};

const closedChannelFragment: Cache.WriteFragmentOptions<
  ChannelBlockFragment,
  null
> = {
  fragment: channelBlockFragmentNode,
  data: {
    __typename: "Channel",
    id: 123,
    title: "Closed channel",
    href: "#",
    updated_at: "2 hours ago",
    slug: "#",
    visibility: "closed",
    counts: {
      __typename: "ChannelCounts",
      contents: 400,
    },
    owner: {
      __typename: "User",
      id: 123,
      name: "Tyler Deitz",
    },
  },
};

const publicChannelFragment: Cache.WriteFragmentOptions<
  ChannelBlockFragment,
  null
> = {
  fragment: channelBlockFragmentNode,
  data: {
    __typename: "Channel",
    id: 1234,
    title: "Open channel",
    href: "#",
    updated_at: "2 hours ago",
    slug: "#",
    visibility: "public",
    counts: {
      __typename: "ChannelCounts",
      contents: 400,
    },
    owner: {
      __typename: "User",
      id: 123,
      name: "Tyler Deitz",
    },
  },
};

const groupFragment: Cache.WriteFragmentOptions<GroupBlockFragment, null> = {
  fragment: groupBlockFragmentNode,
  data: {
    __typename: "Group",
    id: 123,
    name: "",
    href: "",
    visibility: "public",
  },
};

export const TestBlocksPage: React.FC = () => {
  return (
    <>
      <MockFragment fragment={userFragment} />
      <MockFragment fragment={closedChannelFragment} />
      <MockFragment fragment={publicChannelFragment} />
      <MockFragment fragment={groupFragment} />

      <div className="grid grid-cols-auto-fit-block auto-rows-block gap-4 p-4">
        <Block id={123} variant={BlockVariant.user} />
        <Block id={123} variant={BlockVariant.channel} />
        <Block id={1234} variant={BlockVariant.channel} />
        <Block id={123} variant={BlockVariant.group} />
      </div>
    </>
  );
};
