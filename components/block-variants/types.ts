import { React } from "@ungap/global-this";

export type BlockVariantComponentRenderProps = {
  content: React.ReactElement | null;
  title: string | null;
  href: string | null;
};

export type BlockVariantComponentChildren = (
  renderProps: BlockVariantComponentRenderProps
) => React.ReactElement;

export type BlockVariantComponent = (props: {
  id: number;
  children: BlockVariantComponentChildren;
}) => React.ReactElement;
