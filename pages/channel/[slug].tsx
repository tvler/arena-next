import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChannelPage } from "../../components/ChannelPage";

const Page: NextPage = () => {
  const router = useRouter();
  const nonStringId = router.query.slug;
  const slug: string = typeof nonStringId === "string" ? nonStringId : "";

  return <ChannelPage slug={slug} />;
};

export default Page;
