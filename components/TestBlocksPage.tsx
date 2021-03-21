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
import { EmbedBlockFragment } from "../graphql/gen/EmbedBlockFragment";
import { embedBlockFragmentNode } from "../graphql/fragments/embedBlock";
import { AttachmentBlockFragment } from "../graphql/gen/AttachmentBlockFragment";
import { attachmentBlockFragmentNode } from "../graphql/fragments/attachmentBlock";

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
  title: "Short text",
};

const longTextFragment: TextBlockFragment = {
  __typename: "Text",
  id: 2,
  content:
    "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a tempus velit. Donec rhoncus mi quis quam bibendum, non volutpat augue accumsan.</p><p>Pellentesque ut nulla neque. Nunc pharetra porttitor risus, nec volutpat sapien blandit tempor.</p>",
  title: "Long text",
};

const squareImageFragment: ImageBlockFragment = {
  __typename: "Image",
  id: 1,
  image_url: "/square.png",
  title: "mydog1.jpg",
};

const portaitImageFragment: ImageBlockFragment = {
  __typename: "Image",
  id: 2,
  image_url: "/portrait.png",
  title: "mydog2.jpg",
};

const landscapeImageFragment: ImageBlockFragment = {
  __typename: "Image",
  id: 3,
  image_url: "/landscape.png",
  title: "screen-shot-2021-01-31-at-2.22.00-pm.png",
};

const smallImageFragment: ImageBlockFragment = {
  __typename: "Image",
  id: 4,
  image_url: "/small.jpg",
  title: "Smol image",
};

const linkFragment: LinkBlockFragment = {
  __typename: "Link",
  id: 1,
  image_url: "/link.png",
  title: "Webpage",
};

const embedFragment: EmbedBlockFragment = {
  __typename: "Embed",
  id: 1,
  image_url: "/embed.png",
  title: "Embed title",
};

const attachmentFragment: AttachmentBlockFragment = {
  __typename: "Attachment",
  id: 1,
  title: "filename.mov",
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

      <WriteFragment
        fragment={imageBlockFragmentNode}
        data={smallImageFragment}
      />

      <WriteFragment fragment={embedBlockFragmentNode} data={embedFragment} />

      <WriteFragment fragment={linkBlockFragmentNode} data={linkFragment} />

      <WriteFragment
        fragment={attachmentBlockFragmentNode}
        data={attachmentFragment}
      />

      <Header taxonomy={["Test Blocks"]} />

      <div className="grid grid-cols-auto-fit-block auto-rows-block-with-title gap-4 p-4 pt-0">
        <Block />
        <Block id={1} showTitle variant={BlockVariant.user} />
        <Block id={1} showTitle variant={BlockVariant.channel} />
        <Block id={2} showTitle variant={BlockVariant.channel} />
        <Block id={1} showTitle variant={BlockVariant.group} />
        <Block id={1} showTitle variant={BlockVariant.text} />
        <Block id={2} showTitle variant={BlockVariant.text} />
        <Block id={1} showTitle variant={BlockVariant.image} />
        <Block id={2} showTitle variant={BlockVariant.image} />
        <Block id={3} showTitle variant={BlockVariant.image} />
        <Block id={4} showTitle variant={BlockVariant.image} />
        <Block id={1} showTitle variant={BlockVariant.link} />
        <Block id={1} showTitle variant={BlockVariant.embed} />
        <Block id={1} showTitle variant={BlockVariant.attachment} />
      </div>
    </>
  );
};
