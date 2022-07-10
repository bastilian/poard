import log from '~/utils/log';
import * as github from '~/utils/github.server';
import * as owner from '~/models/owner.server';
import * as repository from '~/models/repository.server';
import * as pullRequest from '~/models/pull_request.server';
import * as user from '~/models/user.server';

const createOrganisations = async () => {
  // TODO Check and get the org from GitHub and assign GHid
  const organisationsToCreate = (process.env.CREATE_ORGS || '').split(',');
  log('Begin scraping');

  for (const name of organisationsToCreate) {
    await owner.createMissing(name);
  }
}

const syncRepositories = async () => {
  // TODO ignore archived repositories
  const allOrganisations = await owner.all();

  for (const {
    id: orgId,
    name: orgName,
  } of allOrganisations) {
    const orgRepos = await github.orgRepos(orgName);

    for (const { id: gitHubId, name: repoName, created_at: createdAt, updated_at: updatedAt } of orgRepos) {
      await repository.createMissing(repoName, orgId, {
        createdAt, updatedAt, gitHubId
      });
    }
  }
}

const syncPullRequests = async () => {
  // TODO fetch all pull requests
  // TODO Set merged, closed and updated at
  const allRepossitories = await repository.many()

  for (const repository of allRepossitories) {
    const repoPullrequests = await github.repoPullRequests(repository.name, repository.owner.name)

    for (const {
      id: gitHubId,
      title,
      body,
      user: pullRequestUser,
      created_at: createdAt,
      merged_at: mergedAt,
      closed_at: closedAt,
    } of repoPullrequests) {
      // TODO Scrape labels, CI states, requested reviewer(s), assignees
      const savedUser = await user.createMissing(pullRequestUser?.login, { gitHubId: pullRequestUser?.id });
      // TODO make this "sync"
      await pullRequest.createMissing(title, repository, savedUser, { gitHubId, body, createdAt, mergedAt, closedAt });
    }
  }
}

// TODO Add support for scraping users (repositories)
export default async () => {
  await createOrganisations();
  await syncRepositories();
  await syncPullRequests();
}
