import Logo from "./icons/logo.svg";
import Link from "next/link";

type HeaderProps = {
  taxonomy?: ReadonlyArray<string | { key: string; display: JSX.Element }>;
};

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
          const key: string = typeof el === "string" ? el : el.key;
          const display = typeof el === "string" ? el : el.display;

          return (
            <span key={key} className="font-serif italic text-xl">
              &nbsp;/ {display}
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
