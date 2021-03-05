import { useQuery } from "@apollo/client";
import {
  ConnectableBlockQuery,
  ConnectableBlockQueryVariables,
} from "../../graphql/gen/ConnectableBlockQuery";
import { connectableBlockQueryNode } from "../../graphql/queries/connectableBlock";
import { ImageBlockFragment } from "../../graphql/gen/ImageBlockFragment";
import { BlockVariantComponent } from "./types";

export const ImageBlock: BlockVariantComponent = ({ id, children }) => {
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

  console.log(imageBlockQuery);

  if (block?.__typename !== "Image") {
    return children();
  }

  return children({
    title: "title",
    href: "",
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
