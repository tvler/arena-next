import { React } from "@ungap/global-this";

export type BlockVariantComponentRenderProps = {
  content: React.ReactElement | null;
  title: string | null;
  href: string | null;
};

export interface BlockVariantComponentChildrenReturn
  extends React.ReactElement {
  __isBlockVariantComponentChildrenReturn: true;
}

export type BlockVariantComponentChildren = (
  renderProps: BlockVariantComponentRenderProps
) => BlockVariantComponentChildrenReturn;

export type BlockVariantComponent = (props: {
  id: number;
  children: BlockVariantComponentChildren;
}) => BlockVariantComponentChildrenReturn;
