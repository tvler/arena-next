import { Block, BlockVariant } from "./Block";
import { userBlockFragmentNode } from "../graphql/fragments/userBlock";
import { UserBlockFragment } from "../graphql/gen/UserBlockFragment";
import { WriteFragment } from "./WriteFragment";
import { ChannelBlockFragment } from "../graphql/gen/ChannelBlockFragment";
import { channelBlockFragmentNode } from "../graphql/fragments/channelBlock";
import { GroupBlockFragment } from "../graphql/gen/GroupBlockFragment";
import { groupBlockFragmentNode } from "../graphql/fragments/groupBlock";
import { Header } from "./Header";
import { TextBlockFragment } from "../graphql/gen/TextBlockFragment";
import { textBlockFragmentNode } from "../graphql/fragments/textBlock";

const userBlockFragment: UserBlockFragment = {
  __typename: "User",
  id: 123,
  name: "Tyler Deitz",
  slug: "are-na",
  initials: "TD",
  avatar: null,
};

const closedChannelFragment: ChannelBlockFragment = {
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
};

const publicChannelFragment: ChannelBlockFragment = {
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
};

const groupFragment: GroupBlockFragment = {
  __typename: "Group",
  id: 123,
  name: "",
  href: "",
  visibility: "public",
};

const textFragment: TextBlockFragment = {
  __typename: "Text",
  id: 10651025,
  content: "Text content",
};

export const TestBlocksPage: React.FC = () => {
  return (
    <>
      <WriteFragment
        fragment={userBlockFragmentNode}
        data={userBlockFragment}
      />

      <WriteFragment
        fragment={channelBlockFragmentNode}
        data={publicChannelFragment}
      />

      <WriteFragment
        fragment={channelBlockFragmentNode}
        data={closedChannelFragment}
      />

      <WriteFragment fragment={groupBlockFragmentNode} data={groupFragment} />

      <WriteFragment fragment={textBlockFragmentNode} data={textFragment} />

      <Header taxonomy={["Test Blocks"]} />

      <div className="grid grid-cols-auto-fit-block auto-rows-block gap-4 p-4">
        <Block id={123} variant={BlockVariant.user} />
        <Block id={123} variant={BlockVariant.channel} />
        <Block id={1234} variant={BlockVariant.channel} />
        <Block id={123} variant={BlockVariant.group} />
        <Block id={10651025} variant={BlockVariant.text} />
      </div>
    </>
  );
};
