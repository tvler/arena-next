import Logo from "./icons/logo.svg";
import Link from "next/link";

type Taxonomy = ReadonlyArray<
  | string
  | { key: string; display: JSX.Element; href?: string }
  | { display: string; href?: string }
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

const spacer = <>&nbsp;/&nbsp;</>;

const Header: React.FC<HeaderProps> = ({
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
    <div className="p-4 flex flex-row">
      <Link href="/">
        <a className="no-underline">
          <Logo className="w-6 h-6" fill="currentColor"></Logo>
        </a>
      </Link>
      {taxonomy ? (
        <div className="flex flex-row flex-wrap font-serif italic text-xl">
          {taxonomy.map((el) => {
            const key: string =
              typeof el === "string" ? el : "key" in el ? el.key : el.display;
            const display: string | JSX.Element =
              typeof el === "string" ? el : el.display;
            const href: string | null =
              typeof el === "string" ? null : el.href ?? null;

            if (href === null) {
              return (
                <span key={key}>
                  {spacer}
                  {display}
                </span>
              );
            }

            return (
              <span key={key}>
                {spacer}
                <Link href={href}>
                  <a className="no-underline">{display}</a>
                </Link>
              </span>
            );
          })}
        </div>
      ) : (
        <span className="font-serif italic text-xl">&nbsp;</span>
      )}
    </div>
  );
};

export default Header;
