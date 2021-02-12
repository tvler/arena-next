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
  id: 0,
  name: "Tyler Deitz",
  slug: "are-na",
  initials: "TD",
  avatar: null,
};

const closedChannelFragment: ChannelBlockFragment = {
  __typename: "Channel",
  id: 1,
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
  id: 2,
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
  id: 3,
  name: "",
  href: "",
  visibility: "public",
};

const shortTextFragment: TextBlockFragment = {
  __typename: "Text",
  id: 4,
  content: "<p>Text content</p>",
};

const longTextFragment: TextBlockFragment = {
  __typename: "Text",
  id: 5,
  content:
    '<p>More groundwork on blocks. Trying to get myself into a space where I can start building out new block variants without having to worry about networking or how the block will be rendered.</p>\n\n<p>This led me to build out a new &quot;blocks&quot; component library where I&#39;ll be rendering every block variant as they&#39;re built: <a href="https://arena-next.vercel.app/test-blocks" target="_blank" rel="nofollow noopener">arena-next.vercel.app/test-blocks</a>.</p>\n\n<p>To help build that page I made a new component called WriteFragment (<a href="https://gist.github.com/tvler/0a158e651dc88ec43094584b72789b70" target="_blank" rel="nofollow noopener">gist</a>): A declarative way to write fragments to Apollo cache using React components. The cool thing about that is you can navigate to the test-blocks page, have dummy-data written to the cache, and when you navigate away, the WriteFragment components will unmount and the dummy-data gets deleted.</p>',
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

      <WriteFragment
        fragment={textBlockFragmentNode}
        data={shortTextFragment}
      />

      <WriteFragment fragment={textBlockFragmentNode} data={longTextFragment} />

      <Header taxonomy={["Test Blocks"]} />

      <div className="grid grid-cols-auto-fit-block auto-rows-block gap-4 p-4">
        <Block id={0} variant={BlockVariant.user} />
        <Block id={1} variant={BlockVariant.channel} />
        <Block id={2} variant={BlockVariant.channel} />
        <Block id={3} variant={BlockVariant.group} />
        <Block id={4} variant={BlockVariant.text} />
        <Block id={5} variant={BlockVariant.text} />
      </div>
    </>
  );
};
