import Header from "./Header";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Header taxonomy={["Explore"]} />
      <div className="flex flex-col pl-4 pr-4 items-start">
        <span className="text-xl">User pages</span>
        <Link href="/user/tyler-deitz">
          <a>/user/tyler-deitz</a>
        </Link>
        <Link href="/user/are-na">
          <a>/user/are-na</a>
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
      </div>
    </div>
  );
};

export default Home;
