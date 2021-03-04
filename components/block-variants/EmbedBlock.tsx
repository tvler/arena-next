import { useQuery } from "@apollo/client";
import {
  ConnectableBlockQuery,
  ConnectableBlockQueryVariables,
} from "../../graphql/gen/ConnectableBlockQuery";
import { connectableBlockQueryNode } from "../../graphql/queries/connectableBlock";
import { EmbedBlockFragment } from "../../graphql/gen/EmbedBlockFragment";
import { BlockVariantComponent } from "./types";

export const EmbedBlock: BlockVariantComponent = ({ id, children }) => {
  const typename: EmbedBlockFragment["__typename"] = "Embed";
  const embedBlockQuery = useQuery<
    ConnectableBlockQuery,
    ConnectableBlockQueryVariables
  >(connectableBlockQueryNode, {
    variables: {
      id: `${id}`,
      typename,
    },
    ssr: false,
    fetchPolicy: "cache-only",
  });

  const block = embedBlockQuery?.data?.blokk;

  if (block?.__typename !== "Embed") {
    return children({
      href: null,
      title: null,
      content: null,
    });
  }

  return children({
    title: "title",
    href: null,
    content: block.image_url ? (
      <img
        loading="lazy"
        alt=""
        src={block.image_url}
        className="absolute top-0 left-0 w-full h-full object-scale-down"
      />
    ) : null,
  });
};
