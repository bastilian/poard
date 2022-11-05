import { buildFilterValues } from '~/utils';
import { useEffect } from 'react';
import { useFetcher } from '@remix-run/react';

const REPOSITORY_URL = '/repositories';

// TODO This queries the repositories but it should query something else
// idealy there should be a route something like /pullrequests/filters
// this endpoint should contain all neccessary data to build all filters
const useFilterFetcher = () => {
  const fetcher = useFetcher();
  const filters = buildFilterValues(fetcher?.data || []);

  useEffect(() => {
    if (fetcher.type === 'init') {
      fetcher.load(REPOSITORY_URL);
    }
  }, [fetcher]);

  return filters;
};

export default useFilterFetcher;
