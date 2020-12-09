import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import profileSsr from "../graphql/queries/profileSsr";
import Logo from "./icons/logo.svg";
import Link from "next/link";

const Profile: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const q = useQuery(profileSsr, {
    ssr: true,
    variables: { id },
  });

  if (q.data?.identity?.identifiable?.__typename !== "User") {
    return null;
  }
  const user = q.data.identity.identifiable;

  return (
    <div className="flex flex-col">
      <div className="p-4 flex flex-row">
        <Logo className="w-6 h-6" fill="currentColor"></Logo>
        <span className="font-serif italic text-xl">&nbsp;/ {user.name}</span>
      </div>

      <div className="flex flex-row space-x-4 items-start pl-4 pr-4">
        <button
          style={{ backgroundColor: "#E2ECFF", color: "#3B5998" }}
          className="pl-2.5 pr-2.5 pt-1 pb-1 rounded-md"
        >
          Follow
        </button>

        <div className="flex flex-col text-sm leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: user.bio || "" }} />
          <span>
            {user.counts?.channels} channels, {user.counts?.blocks} blocks
          </span>
          <div className="flex flex-row space-x-3">
            <Link href="followers">
              <a>Followers</a>
            </Link>

            <Link href="following">
              <a>Following</a>
            </Link>
          </div>
        </div>
      </div>

      {/* {JSON.stringify(user)} */}
    </div>
  );
};

export default Profile;
