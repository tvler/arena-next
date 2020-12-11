import Logo from "./icons/logo.svg";
import Link from "next/link";

type HeaderProps = {
  taxonomy?: ReadonlyArray<
    | string
    | { key: string; display: JSX.Element; href?: string }
    | { display: string; href?: string }
  >;
};

const spacer = <>&nbsp;/&nbsp;</>;

const Header: React.FC<HeaderProps> = ({ taxonomy }) => {
  return (
    <div className="p-4 flex flex-row">
      <Link href="/">
        <a className="no-underline">
          <Logo className="w-6 h-6" fill="currentColor"></Logo>
        </a>
      </Link>
      {taxonomy ? (
        taxonomy.map((el) => {
          const key: string =
            typeof el === "string" ? el : "key" in el ? el.key : el.display;
          const display: string | JSX.Element =
            typeof el === "string" ? el : el.display;
          const href: string | null =
            typeof el === "string" ? null : el.href ?? null;

          if (href === null) {
            return (
              <span key={key} className="font-serif italic text-xl">
                {spacer}
                {display}
              </span>
            );
          }

          return (
            <span key={key} className="font-serif italic text-xl">
              {spacer}
              <Link href={href}>
                <a className="no-underline">{display}</a>
              </Link>
            </span>
          );
        })
      ) : (
        <span className="font-serif italic text-xl">&nbsp;</span>
      )}
    </div>
  );
};

export default Header;
