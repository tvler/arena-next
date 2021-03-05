import { useQuery } from "@apollo/client";
import { AttachmentBlockFragment } from "../../graphql/gen/AttachmentBlockFragment";
import {
  ConnectableBlockQuery,
  ConnectableBlockQueryVariables,
} from "../../graphql/gen/ConnectableBlockQuery";
import { connectableBlockQueryNode } from "../../graphql/queries/connectableBlock";
import { BlockVariantComponent } from "./types";

export const AttachmentBlock: BlockVariantComponent = ({ id, children }) => {
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
    return children();
  }

  return children({
    title: "title",
    href: null,
    content: (
      <div className="flex-1 p-4 flex text-center justify-center items-center bg-gray-light">
        <span className="text-gray-darkest">{block?.title || "file"}</span>
      </div>
    ),
  });
};
