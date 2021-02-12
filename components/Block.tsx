import { forwardRef, memo } from "react";
import { UserBlock } from "./block-variants/UserBlock";
import { ChannelBlock } from "./block-variants/ChannelBlock";
import { GroupBlock } from "./block-variants/GroupBlock";
import { NullBlock } from "./block-variants/NullBlock";
import { TextBlock } from "./block-variants/TextBlock";

/*
 * Types of blocks that can be rendered
 */

export enum BlockVariant {
  user,
  channel,
  group,
  text,
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
      default:
        variantContent = <NullBlock />;
        break;
    }

    return (
      <div
        ref={ref}
        className="flex contain-strict rounded-sm border-gray bg-white border overflow-hidden"
      >
        {variantContent}
      </div>
    );
  })
);
