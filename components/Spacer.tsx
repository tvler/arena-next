type SpacerSize =
  | "1"
  | "1.5"
  | "2"
  | "2.5"
  | "3"
  | "3.5"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "14"
  | "16"
  | "20"
  | "24"
  | "28"
  | "32";

const sizeClassNameMap: Record<SpacerSize, string> = {
  1: "h-1",
  1.5: "h-1.5",
  2: "h-2",
  2.5: "h-2.5",
  3: "h-3",
  3.5: "h-3.5",
  4: "h-4",
  5: "h-5",
  6: "h-6",
  7: "h-7",
  8: "h-8",
  9: "h-9",
  10: "h-10",
  11: "h-11",
  12: "h-12",
  14: "h-14",
  16: "h-16",
  20: "h-20",
  24: "h-24",
  28: "h-28",
  32: "h-32",
};

export const Spacer: React.FC<{
  size: SpacerSize;
}> = ({ size }) => {
  return <div className={sizeClassNameMap[size]} />;
};
