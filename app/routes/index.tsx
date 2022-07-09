import { useEffect, useMemo } from 'react'
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { Grid, GridItem, Spinner, Bullseye } from '@patternfly/react-core/dist/umd/react-core';
import { debounce } from '~/utils';
import RepositoryPanel from '~/components/RepositoryPanel';
import FilterToolbar from '~/components/FilterToolbar';
import * as repository from '~/models/repository.server';

const PR_URL = '/pull_requests';

export const loader = async () => {
  const repoData = await repository.all();
  const repositories = repoData.filter(({ pullRequests }) =>
    pullRequests.length > 0
  ).map(({ name }) => (name)).sort();
  const users = [...new Set(
    repoData.flatMap(({ pullRequests }) =>
      pullRequests.map((
        { author: { username } }
      ) => username)
    )
  )].sort();

  return json({
    filters: {
      repositories,
      users
    }
  });
}

// TODO The root "/" (here) should actually be something of a stream of all new/update pull requests that automatically updates
export default () => {
  const { filters } = useLoaderData();
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
    <Grid hasGutter>
      <GridItem>
        <FilterToolbar filters={filters} onSubmit={onSubmit} isFetching={isFetching} />
      </GridItem>

      {
        (pullRequestsGroupedByRepo).map((repo) =>
          repo.pullRequests.length > 0 &&
          <GridItem key={`repo-${repo.name}`}>
            <RepositoryPanel repositoryName={repo.name} data={repo} />
          </GridItem>
        )
      }

    </Grid>
  )
}
