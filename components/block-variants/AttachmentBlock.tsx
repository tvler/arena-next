import { useQuery } from "@apollo/client";
import { memo } from "react";
import { AttachmentBlockFragment } from "../../graphql/gen/AttachmentBlockFragment";
import {
  ConnectableBlockQuery,
  ConnectableBlockQueryVariables,
} from "../../graphql/gen/ConnectableBlockQuery";
import { connectableBlockQueryNode } from "../../graphql/queries/connectableBlock";

export const AttachmentBlock: React.FC<{ id: number }> = memo(({ id }) => {
  const typename: AttachmentBlockFragment["__typename"] = "Attachment";
  const attachmentBlockQuery = useQuery<
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

  const block = attachmentBlockQuery?.data?.blokk;

  if (block?.__typename !== "Attachment") {
    return null;
  }

  return (
    <div className="flex-1 p-4 flex text-center justify-center items-center bg-gray-light">
      <span className="text-gray-darkest">{block?.title || "file"}</span>
    </div>
  );
});
