import Link from "next/link";
import React, { forwardRef, memo, useCallback } from "react";
import { UserBlock } from "./block-variants/UserBlock";
import { ChannelBlock } from "./block-variants/ChannelBlock";
import { GroupBlock } from "./block-variants/GroupBlock";
import { TextBlock } from "./block-variants/TextBlock";
import { ImageBlock } from "./block-variants/ImageBlock";
import { LinkBlock } from "./block-variants/LinkBlock";
import { EmbedBlock } from "./block-variants/EmbedBlock";
import { AttachmentBlock } from "./block-variants/AttachmentBlock";
import {
  BlockVariantComponent,
  BlockVariantComponentChildren,
  BlockVariantComponentChildrenReturn,
} from "./block-variants/types";

/*
 * Types of blocks that can be rendered
 */

export enum BlockVariant {
  user,
  channel,
  group,
  text,
  image,
  link,
  embed,
  attachment,
}

/*
 * Block props. Don't add a variant to a block to render a null state.
 */

export type BlockProps =
  | {
      id: number;
      variant: BlockVariant;
      showTitle?: boolean;
    }
  | {
      id?: undefined;
      variant?: undefined;
      showTitle?: undefined;
    };

/*
 * The container of the block and the title
 */

type BlockContainerProps = {
  title?: string | null;
  href?: string | null;
  children?: React.ReactElement | null;
};

const BlockContainer = forwardRef<HTMLDivElement, BlockContainerProps>(
  ({ href, title, children }, ref) => {
    const blockClassName =
      "flex flex-none no-underline relative aspect-h-1 aspect-w-1";

    const block = href ? (
      <Link href={href}>
        <a className={blockClassName}>{children}</a>
      </Link>
    ) : (
      <div className={blockClassName}>{children}</div>
    );

    const titleElement =
      typeof title === "string" ? (
        <div className="text-center text-xxs text-gray-darkest flex-1 flex items-center justify-center">
          <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
            {title}
          </span>
        </div>
      ) : null;

    return (
      <div className="flex flex-col" ref={ref}>
        <div className="border border-gray rounded-sm overflow-hidden flex-none">
          {block}
        </div>
        {titleElement}
      </div>
    );
  }
);

/*
 * The final block component
 */

export const Block = memo(
  forwardRef<HTMLDivElement, BlockProps>((props, ref) => {
    const renderProp = useCallback<BlockVariantComponentChildren>(
      ({ content, title, href } = {}) =>
        (
          <BlockContainer
            ref={ref}
            title={props.showTitle ? title : null}
            href={href}
          >
            {content}
          </BlockContainer>
        ) as BlockVariantComponentChildrenReturn,
      [props.showTitle, ref]
    );

    /*
     * Early exit
     */

    if (props.id === undefined) {
      return <BlockContainer ref={ref} title={null} href={null} />;
    }

    /*
     * Variant block component
     */

    let VariantComponent: BlockVariantComponent;
    switch (props.variant) {
      case BlockVariant.user:
        VariantComponent = UserBlock;
        break;
      case BlockVariant.channel:
        VariantComponent = ChannelBlock;
        break;
      case BlockVariant.group:
        VariantComponent = GroupBlock;
        break;
      case BlockVariant.text:
        VariantComponent = TextBlock;
        break;
      case BlockVariant.image:
        VariantComponent = ImageBlock;
        break;
      case BlockVariant.link:
        VariantComponent = LinkBlock;
        break;
      case BlockVariant.embed:
        VariantComponent = EmbedBlock;
        break;
      case BlockVariant.attachment:
        VariantComponent = AttachmentBlock;
        break;
    }

    return <VariantComponent id={props.id}>{renderProp}</VariantComponent>;
  })
);
