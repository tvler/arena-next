import { useApolloClient, Cache } from "@apollo/client";
import { useEffect } from "react";

/*
 * WriteFragment: A declarative way to write fragments to Apollo cache
 * using React components. When the fragment props change, the cache is
 * updated. When then component unmounts, the fragment is deleted.
 *
 * This is essentially a reactive version of the cache.writeFragment
 * method, using the same exact arguments and types.
 *
 * writeFragment API: apollographql.com/docs/react/api/cache/InMemoryCache/#writefragment
 *
 * Ex:
 *   const fragment = gql`fragment UserFragment on User { id name }`;
 *   const data = {
 *     __typename: "User",
 *     id: 123,
 *     name: "Tyler Deitz",
 *   };
 *
 *   // Then, somewhere in your JSX
 *
 *   <WriteFragment fragment={fragment} data={data} />
 */

export const WriteFragment: React.FC<Cache.WriteFragmentOptions<any, any>> = ({
  fragment,
  data,
  broadcast,
  id,
  fragmentName,
  variables,
}) => {
  const { cache } = useApolloClient();

  useEffect(() => {
    cache.writeFragment({
      fragment,
      data,
      broadcast,
      id,
      fragmentName,
      variables,
    });

    return () => {
      const normalizedIdentity = cache.identify(data);
      if (normalizedIdentity !== undefined) {
        cache.evict({ id: normalizedIdentity });
        cache.gc();
      }
    };
  }, [broadcast, cache, data, fragment, fragmentName, id, variables]);

  return null;
};
