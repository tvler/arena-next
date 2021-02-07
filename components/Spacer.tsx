type SpacerProps = {
  size:
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
};

export const Spacer: React.FC<SpacerProps> = ({ size }) => {
  return <div className={`h-${size}`} />;
};
