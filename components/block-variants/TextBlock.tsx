import { useQuery } from "@apollo/client";
import { TextBlockFragment } from "../../graphql/gen/TextBlockFragment";
import {
  ConnectableBlockQuery,
  ConnectableBlockQueryVariables,
} from "../../graphql/gen/ConnectableBlockQuery";
import { connectableBlockQueryNode } from "../../graphql/queries/connectableBlock";
import { BlockVariantComponent } from "./types";

export const TextBlock: BlockVariantComponent = ({ id, children }) => {
  const typename: TextBlockFragment["__typename"] = "Text";
  const textBlockQuery = useQuery<
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

  const block = textBlockQuery?.data?.blokk;

  if (block?.__typename !== "Text") {
    return children();
  }

  return children({
    title: "title",
    href: null,
    content: (
      <div
        className="flex-1 p-3 break-word prose prose-xs w-full"
        dangerouslySetInnerHTML={{ __html: block.content || "" }}
      ></div>
    ),
  });
};
