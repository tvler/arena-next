import { Header } from "./Header";
import Link from "next/link";

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col pb-4">
      <Header taxonomy={["Explore"]} />
      <div className="flex flex-col pl-4 pr-4 items-start">
        <span className="text-xl">User pages</span>

        <Link href="/user/tyler-deitz">
          <a>user/tyler-deitz</a>
        </Link>

        <Link href="/user/are-na">
          <a>user/are-na</a>
        </Link>

        <span className="text-xl mt-7">Channel pages</span>

        <Link href="/channel/arena-next-journal">
          <a>channel/arena-next-journal</a>
        </Link>

        <Link href="/channel/arena-influences">
          <a>channel/arena-influences</a>
        </Link>

        <Link href="/channel/image-board">
          <a>channel/image-board</a>
        </Link>

        <Link href="/channel/cool-channel-names-channels-i-like">
          <a>channel/cool-channel-names-channels-i-like</a>
        </Link>

        <span className="text-xl mt-7">Test pages</span>

        <Link href="/test-block">
          <a>test-block</a>
        </Link>

        <Link href="/test-blocks">
          <a>test-blocks</a>
        </Link>

        <span className="text-xl mt-7">Meta</span>

        <a href="https://github.com/tvler/arena-next">GitHub repo</a>

        <div>
          <a href="https://www.are.na/tyler-deitz/arena-next-journal">
            Project updates
          </a>{" "}
          (
          <a href="https://www.are.na/tyler-deitz/arena-next-journal/feed/rss">
            rss
          </a>
          )
        </div>

        <a href="https://www.figma.com/file/D2mcAVoemWmuqk5ohxsvOz/arena-next">
          Figma
        </a>
      </div>
    </div>
  );
};
