import Logo from "./icons/logo.svg";
import Link from "next/link";

type HeaderProps = {
  taxonomy?: ReadonlyArray<string>;
};

const Header: React.FC<HeaderProps> = ({ taxonomy }) => {
  return (
    <div className="p-4 flex flex-row">
      <Link href="/">
        <a className="no-underline">
          <Logo className="w-6 h-6" fill="currentColor"></Logo>
        </a>
      </Link>
      {taxonomy &&
        taxonomy.map((str) => (
          <span key={str} className="font-serif italic text-xl">
            &nbsp;/ {str}
          </span>
        ))}
    </div>
  );
};

export default Header;
