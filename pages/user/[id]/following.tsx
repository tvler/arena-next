import { NextPage } from "next";
import { useRouter } from "next/router";
import { UserFollowingPage } from "../../../components/UserFollowingPage";

const Page: NextPage = () => {
  const router = useRouter();
  const nonStringId = router.query.id;
  const slug: string = typeof nonStringId === "string" ? nonStringId : "";

  return <UserFollowingPage slug={slug} />;
};

export default Page;
