/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.svg" {
  const Component: React.FC<JSX.IntrinsicElements["svg"]>;
  export default Component;
}
