import { NextPage } from "next";
import { useRouter } from "next/router";
import { UserFollowersPage } from "../../../components/UserFollowersPage";

const Page: NextPage = () => {
  const router = useRouter();
  const nonStringId = router.query.id;
  const slug: string = typeof nonStringId === "string" ? nonStringId : "";

  return <UserFollowersPage slug={slug} />;
};

export default Page;
