import { Octokit } from "@octokit/rest";
import { debug } from '~/utils/log';
import { GITHUB_TOKEN } from '../../config';

import type { Owner, Repository } from "@prisma/client";

const REPO_BATCH_SIZE = 100;
export let callCount = 0;

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

const fetchOrgRepos = async (name: Owner['name'], page: number) =>
  (await octokit.rest.repos.listForOrg({
    org: name,
    page,
    sort: 'created',
    per_page: 100,
  })).data;


export const orgRepos = async (name: Owner['name']) => {
  const repoCount = (await octokit.rest.orgs.get({ org: name })).data.public_repos;
  // TODO extract into helper function
  const pages = Math.ceil(repoCount / REPO_BATCH_SIZE) || 1;
  const pagedRepos = await Promise.all(
    [...new Array(pages)].map(async (_, pageIdx) =>
      await fetchOrgRepos(name, pageIdx + 1)
    )
  );

  return pagedRepos.flat();
};

// TODO Fetch all open pull requests (batched)
export const repoPullRequests = async (repositoryName: Repository['name'], ownerName: Owner['name']) =>
  (await octokit.rest.pulls.list({
    owner: ownerName,
    repo: repositoryName,
  })).data;

export default (() => {
  callCount++;
  debug('Calling API count: ', callCount);
  return octokit;
})();
