import { useEffect } from 'react'
import { useFetcher } from "@remix-run/react";
import { Grid, GridItem } from '@patternfly/react-core/dist/umd/react-core';
import { debounce } from '~/utils';
import RepositoryPanel from '~/components/RepositoryPanel';
import FilterToolbar from '~/components/FilterToolbar';

const PR_URL = '/pull_requests';

// TODO The root "/" (here) should actually be something of a stream of all new/update pull requests that automatically updates
export default () => {
  const fetcher = useFetcher();
  const pullRequestsGroupedByRepo = fetcher.data || [];
  const isFetching = fetcher.state === 'loading';

  const onSubmit = debounce((fetchFilters) => {
    // TODO this doesn't seem right
    if (fetcher.type !== "init") {
      fetcher.submit(fetchFilters, { method: "post", action: PR_URL })
    }
  }, 500)

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load(PR_URL)
    }
  }, [fetcher])

  return (
    <>
      <FilterToolbar onSubmit={onSubmit} isFetching={isFetching} />
      <Grid hasGutter style={{ marginTop: '1.5em' }}>
        {
          (pullRequestsGroupedByRepo).map((repo) =>
            repo.pullRequests.length > 0 &&
            <GridItem key={`repo-${repo.name}`}>
              <RepositoryPanel repositoryName={repo.name} data={repo} />
            </GridItem>
          )
        }
      </Grid>
    </>
  )
}
