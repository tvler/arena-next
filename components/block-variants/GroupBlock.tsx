import { BlockVariantComponent } from "./types";

export const GroupBlock: BlockVariantComponent = ({ children }) => {
  return children({
    content: (
      <div className="flex items-center justify-center flex-1">
        <span className="transform -rotate-45 text-gray-darkest">
          Groups not implemented yet!!!
        </span>
      </div>
    ),
  });
};
