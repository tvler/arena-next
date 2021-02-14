import { forwardRef, memo } from "react";
import { UserBlock } from "./block-variants/UserBlock";
import { ChannelBlock } from "./block-variants/ChannelBlock";
import { GroupBlock } from "./block-variants/GroupBlock";
import { NullBlock } from "./block-variants/NullBlock";
import { TextBlock } from "./block-variants/TextBlock";
import { ImageBlock } from "./block-variants/ImageBlock";
import cx from "classnames";

/*
 * Types of blocks that can be rendered
 */

export enum BlockVariant {
  user,
  channel,
  group,
  text,
  image,
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
      default:
        variantContent = <NullBlock />;
        break;
    }

    /*
     * Variant border style
     */

    let borderClass = "";
    switch (props.variant) {
      case BlockVariant.image:
        borderClass = "border-transparent";
        break;
      default:
        borderClass = "border-gray";
        break;
    }

    /*
     * Variant background style
     */

    let backgroundClass = "";
    switch (props.variant) {
      case BlockVariant.image:
        break;
      default:
        backgroundClass = "bg-white";
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
