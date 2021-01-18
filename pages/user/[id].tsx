import { NextPage } from "next";
import { useRouter } from "next/router";
import UserPage from "../../components/UserPage";

const Page: NextPage = () => {
  const router = useRouter();
  const nonStringId = router.query.id;
  const slug: string = typeof nonStringId === "string" ? nonStringId : "";

  return <UserPage slug={slug} />;
};

export default Page;
