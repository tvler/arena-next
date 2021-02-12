import { useQuery } from "@apollo/client";
import { memo } from "react";
import {
  TextBlockQuery,
  TextBlockQueryVariables,
} from "../../graphql/gen/TextBlockQuery";
import { textBlockQueryNode } from "../../graphql/queries/textBlock";

export const TextBlock: React.FC<{ id: number }> = memo(({ id }) => {
  const textBlockQuery = useQuery<TextBlockQuery, TextBlockQueryVariables>(
    textBlockQueryNode,
    {
      variables: {
        id: `${id}`,
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
