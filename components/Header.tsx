import { Fragment } from "react";
import Logo from "./icons/logo.svg";
import Link from "next/link";

type TaxonomyProps = {
  href?: string;
  color?: string;
};

type Taxonomy = ReadonlyArray<
  | string
  | ({ key: string; display: JSX.Element } & TaxonomyProps)
  | ({ display: string; href?: string } & TaxonomyProps)
>;

type HeaderProps = {
  loading?: boolean;
  taxonomy?: Taxonomy;
};

const loadingTaxonomy: Taxonomy = [
  {
    key: "loading",
    display: <span className="animate-ellipses-loader not-italic">…</span>,
  },
];

const Spacer: React.FC<{ nb?: boolean }> = ({ nb }) => (
  <>{nb ? <>&nbsp;</> : <>&#32;</>}/&nbsp;</>
);

export const Header: React.FC<HeaderProps> = ({
  taxonomy: possibleTaxonomy,
  loading,
}) => {
  let taxonomy: Taxonomy | undefined;
  if (loading === true) {
    taxonomy = loadingTaxonomy;
  } else if (possibleTaxonomy) {
    taxonomy = possibleTaxonomy;
  }

  return (
    <div
      className="p-4 flex flex-row font-serif italic text-xl"
      style={{ lineHeight: "1.7rem" }}
    >
      <Link href="/">
        <a className="no-underline">
          <Logo className="w-6 h-6" fill="currentColor"></Logo>
        </a>
      </Link>
      {taxonomy ? (
        <div>
          {taxonomy.map((el, i) => {
            const key: string =
              typeof el === "string" ? el : "key" in el ? el.key : el.display;
            const displayWithoutColor: string | JSX.Element =
              typeof el === "string" ? el : el.display;
            const href: string | null =
              typeof el === "string" ? null : el.href ?? null;

            const display = (
              <span className={typeof el === "string" ? undefined : el.color}>
                {displayWithoutColor}
              </span>
            );

            if (href === null) {
              return (
                <Fragment key={key}>
                  <Spacer nb={i === 0} />
                  {display}
                </Fragment>
              );
            }

            return (
              <Fragment key={key}>
                <Spacer nb={i === 0} />
                <Link href={href}>
                  <a className="no-underline">{display}</a>
                </Link>
              </Fragment>
            );
          })}
        </div>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
};
