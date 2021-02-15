import { useQuery } from "@apollo/client";
import { memo } from "react";
import {
  ConnectableBlockQuery,
  ConnectableBlockQueryVariables,
} from "../../graphql/gen/ConnectableBlockQuery";
import { connectableBlockQueryNode } from "../../graphql/queries/connectableBlock";
import { ImageBlockFragment } from "../../graphql/gen/ImageBlockFragment";

export const ImageBlock: React.FC<{ id: number }> = memo(({ id }) => {
  const typename: ImageBlockFragment["__typename"] = "Image";
  const imageBlockQuery = useQuery<
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

  const block = imageBlockQuery?.data?.blokk;

  if (block?.__typename !== "Image") {
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
