import { forwardRef, memo } from "react";
import { UserBlock } from "./block-variants/UserBlock";
import { ChannelBlock } from "./block-variants/ChannelBlock";
import { GroupBlock } from "./block-variants/GroupBlock";
import { NullBlock } from "./block-variants/NullBlock";
import { TextBlock } from "./block-variants/TextBlock";
import { ImageBlock } from "./block-variants/ImageBlock";
import cx from "classnames";
import { LinkBlock } from "./block-variants/LinkBlock";
import { EmbedBlock } from "./block-variants/EmbedBlock";
import { AttachmentBlock } from "./block-variants/AttachmentBlock";

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
    }
  | {
      id?: undefined;
      variant?: undefined;
    };

/*
 * The final block component
 */

export const Block = memo(
  forwardRef<HTMLDivElement, BlockProps>((props, ref) => {
    /*
     * Variant block component
     */

    let variantContent: React.ReactNode = null;
    switch (props.variant) {
      case BlockVariant.user:
        variantContent = <UserBlock id={props.id} />;
        break;
      case BlockVariant.channel:
        variantContent = <ChannelBlock id={props.id} />;
        break;
      case BlockVariant.group:
        variantContent = <GroupBlock />;
        break;
      case BlockVariant.text:
        variantContent = <TextBlock id={props.id} />;
        break;
      case BlockVariant.image:
        variantContent = <ImageBlock id={props.id} />;
        break;
      case BlockVariant.link:
        variantContent = <LinkBlock id={props.id} />;
        break;
      case BlockVariant.embed:
        variantContent = <EmbedBlock id={props.id} />;
        break;
      case BlockVariant.attachment:
        variantContent = <AttachmentBlock id={props.id} />;
        break;
      default:
        variantContent = <NullBlock />;
        break;
    }

    /*
     * Variant border style
     */

    let borderClass = "";
    switch (props.variant) {
      default:
        borderClass = "border-gray";
        break;
    }

    /*
     * Variant background style
     */

    let backgroundClass = "";
    switch (props.variant) {
      default:
        backgroundClass = "bg-transparent";
        break;
    }

    return (
      <div
        ref={ref}
        className={cx(
          "flex contain-strict rounded-sm border overflow-hidden",
          borderClass,
          backgroundClass
        )}
      >
        {variantContent}
      </div>
    );
  })
);
