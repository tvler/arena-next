import { useQuery } from "@apollo/client";
import {
  ConnectableBlockQuery,
  ConnectableBlockQueryVariables,
} from "../../graphql/gen/ConnectableBlockQuery";
import { connectableBlockQueryNode } from "../../graphql/queries/connectableBlock";
import { LinkBlockFragment } from "../../graphql/gen/LinkBlockFragment";
import { BlockVariantComponent } from "./types";

export const LinkBlock: BlockVariantComponent = ({ id, children }) => {
  const typename: LinkBlockFragment["__typename"] = "Link";
  const linkBlockQuery = useQuery<
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

  const block = linkBlockQuery?.data?.blokk;

  if (block?.__typename !== "Link") {
    return children();
  }

  return children({
    title: block.title,
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
