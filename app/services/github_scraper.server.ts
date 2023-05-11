import { debug } from '~/utils/log';
import * as github from '~/utils/github.server';
import * as owner from '~/models/owner.server';
import * as repository from '~/models/repository.server';
import * as pullRequest from '~/models/pull_request.server';
import * as user from '~/models/user.server';

const createOrganisations = async () => {
  // TODO Check and get the org from GitHub and assign GHid
  const organisationsToCreate = (process.env.CREATE_ORGS || '').split(',');
  debug('Begin scraping');

  for (const name of organisationsToCreate) {
    await owner.createMissing(name);
  }
};

const syncRepositories = async () => {
  debug('Syncing repos');
  // TODO ignore archived repositories
  const allOrganisations = await owner.all();

  for (const { id: orgId, name: orgName } of allOrganisations) {
    const orgRepos = await github.orgRepos(orgName);

    for (const {
      id: gitHubId,
      name: repoName,
      created_at: createdAt,
      updated_at: updatedAt,
    } of orgRepos) {
      await repository.createMissing(repoName, orgId, {
        createdAt,
        updatedAt,
        gitHubId,
      });
    }
  }
};

const syncPullRequests = async () => {
  debug('Syncing PRs');
  // TODO fetch all pull requests
  // TODO Set merged, closed and updated at
  const allRepossitories = await repository.many();

  for (const repository of allRepossitories) {
    const repoPullrequests = await github.repoPullRequests(
      repository.name,
      repository.owner.name
    );
    debug('Syncing PRs for', repository);

    for (const {
      id: gitHubId,
      number,
      title,
      body,
      user: pullRequestUser,
      created_at: createdAt,
      merged_at: mergedAt,
      closed_at: closedAt,
    } of repoPullrequests) {
      // TODO Scrape branch, labels, CI states, requested reviewer(s), assignees
      const savedUser = await user.createMissing(pullRequestUser?.login, {
        gitHubId: pullRequestUser?.id,
      });
      // TODO make this "sync"
      await pullRequest.createMissing(title, repository, savedUser, {
        gitHubId,
        body,
        createdAt,
        mergedAt,
        closedAt,
        number,
      });
    }
  }
};

const syncBranchCommits = async (owner, repository, branch) => {
  debug('Syncing branche commits', branch.name);

  const branchInfo = await github.fetchBranch(owner, repository, branch.name);
  debug(branchInfo);

  const branchCommits = await github.fetchBranchCommits(
    owner,
    repository,
    branch.name
  );
  console.table(
    branchCommits.map(
      ({
        sha,
        commit: {
          message,
          author: { date },
        },
      }) => [sha, date, message]
    )
  );
};

const syncBranches = async () => {
  debug('Syncing branches');
  const allRepossitories = await repository.many();
  for (const repository of allRepossitories) {
    debug('Syncing branches', repository.name);
    const branches = await github.fetchBranches(
      repository.owner.name,
      repository.name
    );

    for (const branch of branches) {
      await syncBranchCommits(repository.owner.name, repository.name, branch);
    }
  }
};

// TODO Add support for scraping users (repositories)
export default async () => {
  await createOrganisations();
  await syncRepositories();
  // await syncPullRequests();
  await syncBranches();
};
