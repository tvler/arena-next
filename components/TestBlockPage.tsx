import { Header } from "../components/Header";

export const TestBlockPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Header taxonomy={["Image"]} />

      <div
        className="relative bg-white overflow-hidden border-t border-b border-gray"
        style={{
          maxHeight: "max(600px, calc(100vh - 18rem))",
        }}
      >
        <div className="aspect-w-1 aspect-h-1"></div>

        <img
          src="/blockexample.png"
          className="object-scale-down absolute top-0 left-0 w-full h-full"
        />
      </div>

      <div
        className="flex flex-col pl-4 pr-4 pt-4 pb-4 text-sm items-start"
        style={{ lineHeight: "1.8" }}
      >
        <span className="font-bold">Night Mail 2020 (Teaser) on Vimeo</span>
        <span>
          <a>Source</a>, <a>Connections</a>
        </span>
        <span>
          Added 8 months ago by <a>Tyler Deitz</a>
        </span>
        <span>&nbsp;</span>
        <div className="flex flex-row space-x-3">
          <button className="pl-3 pr-3 pt-1 pb-1 rounded-md text-blue bg-blue-light text-base">
            Connect
          </button>
          <button className="pl-3 pr-3 pt-1 pb-1 rounded-md text-base bg-gray-light text-gray-darkest">
            Mute
          </button>
        </div>
      </div>
    </div>
  );
};
