import { Cache } from "@apollo/client";
import { Block, BlockVariant } from "./Block";
import { userCardFragmentNode } from "../graphql/fragments/UserCardFragment";
import { UserCardFragment } from "../graphql/gen/UserCardFragment";
import { MockFragment } from "./MockFragment";

export const TestBlocksPage: React.FC = () => {
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

  return (
    <div className="grid grid-cols-auto-fit-block auto-rows-block gap-4 p-4">
      <MockFragment fragment={userFragment}>
        <Block id={123} variant={BlockVariant.user} />
      </MockFragment>
    </div>
  );
};
