import { useQuery } from "@apollo/client";
import { memo } from "react";
import { TextBlockFragment } from "../../graphql/gen/TextBlockFragment";
import {
  TextBlockQuery,
  TextBlockQueryVariables,
} from "../../graphql/gen/TextBlockQuery";
import { textBlockQueryNode } from "../../graphql/queries/textBlock";

export const TextBlock: React.FC<{ id: number }> = memo(({ id }) => {
  const typename: TextBlockFragment["__typename"] = "Text";
  const textBlockQuery = useQuery<TextBlockQuery, TextBlockQueryVariables>(
    textBlockQueryNode,
    {
      variables: {
        id: `${id}`,
        typename,
      },
      ssr: false,
      fetchPolicy: "cache-only",
    }
  );

  const block = textBlockQuery?.data?.blokk;

  if (block?.__typename !== "Text") {
    return null;
  }

  return (
    <div
      className="flex-1 p-4 text-sm text-gray-darkest"
      dangerouslySetInnerHTML={{ __html: block.content || "" }}
    ></div>
  );
});
