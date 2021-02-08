import { useApolloClient, Cache } from "@apollo/client";
import { useEffect } from "react";

export const MockFragment: React.FC<{
  children: JSX.Element;
  fragment: Cache.WriteFragmentOptions<any, any>;
}> = ({ children, fragment }) => {
  const { cache } = useApolloClient();

  useEffect(() => {
    cache.writeFragment(fragment);

    return () => {
      const normalizedIdentity = cache.identify(fragment.data);
      if (normalizedIdentity !== undefined) {
        cache.evict({ id: normalizedIdentity });
        cache.gc();
      }
    };
  }, [cache, fragment]);

  return children;
};
