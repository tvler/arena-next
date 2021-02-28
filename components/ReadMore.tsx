import { useEffect, useRef, useState } from "react";
import cx from "classnames";

type NumberOfLines = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type LineHeight = 1.8;

export const ReadMore: React.FC<{
  numberOfLines: NumberOfLines;
  lineHeight: LineHeight;
  html: string | null;
}> = ({ numberOfLines, html, lineHeight }) => {
  const bigRef = useRef<HTMLDivElement>(null);
  const smallRef = useRef<HTMLDivElement>(null);
  const [shouldShowReadMore, setShouldShowReadMore] = useState(false);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (bigRef.current && smallRef.current) {
      const smallHeight = Math.round(
        smallRef.current.getBoundingClientRect().height
      );
      const bigHeight = Math.round(
        bigRef.current.getBoundingClientRect().height
      );

      if (bigHeight > smallHeight) {
        setShouldShowReadMore(true);
      }
    }
  }, []);

  return (
    <div>
      <div
        ref={smallRef}
        style={
          !readMore
            ? { maxHeight: `${lineHeight * numberOfLines}em` }
            : undefined
        }
        className="overflow-hidden"
      >
        <div ref={bigRef} dangerouslySetInnerHTML={{ __html: html ?? "" }} />
      </div>

      <button
        className={cx(
          "text-left text-gray-dark animate-ellipses-loader animation-iteration-1",
          !readMore && shouldShowReadMore ? "visible" : "invisible"
        )}
        title="Read more"
        onClick={() => {
          setReadMore(true);
        }}
      >
        <span className="transform rotate-180 inline-block">…</span>
      </button>
    </div>
  );
};
