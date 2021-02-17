import { useQuery } from "@apollo/client";
import { memo } from "react";
import { TextBlockFragment } from "../../graphql/gen/TextBlockFragment";
import {
  ConnectableBlockQuery,
  ConnectableBlockQueryVariables,
} from "../../graphql/gen/ConnectableBlockQuery";
import { connectableBlockQueryNode } from "../../graphql/queries/connectableBlock";

export const TextBlock: React.FC<{ id: number }> = memo(({ id }) => {
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
    return null;
  }

  return (
    <div
      className="flex-1 p-4 break-word prose prose-xs w-full -mt-0.5"
      dangerouslySetInnerHTML={{ __html: block.content || "" }}
    ></div>
  );
});
