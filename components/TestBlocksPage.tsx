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
import { ImageBlockFragment } from "../graphql/gen/ImageBlockFragment";
import { imageBlockFragmentNode } from "../graphql/fragments/imageBlock";
import { LinkBlockFragment } from "../graphql/gen/LinkBlockFragment";
import { linkBlockFragmentNode } from "../graphql/fragments/linkBlock";

const userBlockFragment: UserBlockFragment = {
  __typename: "User",
  id: 1,
  name: "Tyler Deitz",
  slug: "tyler-deitz",
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
  id: 1,
  name: "",
  href: "",
  visibility: "public",
};

const shortTextFragment: TextBlockFragment = {
  __typename: "Text",
  id: 1,
  content: "<p>Text content</p>",
};

const longTextFragment: TextBlockFragment = {
  __typename: "Text",
  id: 2,
  content:
    "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a tempus velit. Donec rhoncus mi quis quam bibendum, non volutpat augue accumsan.</p><p>Pellentesque ut nulla neque. Nunc pharetra porttitor risus, nec volutpat sapien blandit tempor.</p>",
};

const squareImageFragment: ImageBlockFragment = {
  __typename: "Image",
  id: 1,
  image_url: "/square.png",
};

const portaitImageFragment: ImageBlockFragment = {
  __typename: "Image",
  id: 2,
  image_url: "/portrait.png",
};

const landscapeImageFragment: ImageBlockFragment = {
  __typename: "Image",
  id: 3,
  image_url: "/landscape.png",
};

const linkFragment: LinkBlockFragment = {
  __typename: "Link",
  id: 1,
  image_url: "/link.webp",
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

      <WriteFragment
        fragment={imageBlockFragmentNode}
        data={squareImageFragment}
      />

      <WriteFragment
        fragment={imageBlockFragmentNode}
        data={portaitImageFragment}
      />

      <WriteFragment
        fragment={imageBlockFragmentNode}
        data={landscapeImageFragment}
      />

      <WriteFragment fragment={linkBlockFragmentNode} data={linkFragment} />

      <Header taxonomy={["Test Blocks"]} />

      <div className="grid grid-cols-auto-fit-block auto-rows-block gap-4 p-4 pt-0">
        <Block id={1} variant={BlockVariant.user} />
        <Block id={1} variant={BlockVariant.channel} />
        <Block id={2} variant={BlockVariant.channel} />
        <Block id={1} variant={BlockVariant.group} />
        <Block id={1} variant={BlockVariant.text} />
        <Block id={2} variant={BlockVariant.text} />
        <Block id={1} variant={BlockVariant.image} />
        <Block id={2} variant={BlockVariant.image} />
        <Block id={3} variant={BlockVariant.image} />
        <Block id={1} variant={BlockVariant.link} />
      </div>
    </>
  );
};
