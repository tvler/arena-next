import { NextPage } from "next";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const router = useRouter();
  const nonStringId = router.query.slug;
  const slug: string = typeof nonStringId === "string" ? nonStringId : "";

  return <>{slug}</>;
};

export default Page;
