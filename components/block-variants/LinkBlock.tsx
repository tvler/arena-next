import { useQuery } from "@apollo/client";
import { memo } from "react";
import {
  ConnectableBlockQuery,
  ConnectableBlockQueryVariables,
} from "../../graphql/gen/ConnectableBlockQuery";
import { connectableBlockQueryNode } from "../../graphql/queries/connectableBlock";
import { LinkBlockFragment } from "../../graphql/gen/LinkBlockFragment";

export const LinkBlock: React.FC<{ id: number }> = memo(({ id }) => {
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
    return null;
  }

  return block.image_url ? (
    <div className="flex-1 relative">
      <img
        loading="lazy"
        alt=""
        src={block.image_url}
        className="absolute top-0 left-0 w-full h-full object-scale-down"
      />
    </div>
  ) : null;
});
