import { useQuery } from "@apollo/client";
import { memo } from "react";
import {
  ConnectableBlockQuery,
  ConnectableBlockQueryVariables,
} from "../../graphql/gen/ConnectableBlockQuery";
import { connectableBlockQueryNode } from "../../graphql/queries/connectableBlock";
import { EmbedBlockFragment } from "../../graphql/gen/EmbedBlockFragment";

export const EmbedBlock: React.FC<{ id: number }> = memo(({ id }) => {
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
    return null;
  }

  return block.image_url ? (
    <div className="flex-1 relative">
      <img
        loading="lazy"
        alt=""
        src={block.image_url}
        className="absolute top-0 left-0 w-full h-full object-contain"
      />
    </div>
  ) : null;
});
