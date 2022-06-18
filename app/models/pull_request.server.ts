import { prisma } from "~/utils/db.server";
import { log, debug } from '~/utils/log';

import type { PullRequest, Repository, User } from "@prisma/client";

export const all = async (where = {}) => (
  (await prisma.pullRequest.findMany({
    where,
    select: {
      id: true,
      title: true,
      author: {
        select: { username: true }
      },
      updatedAt: true,
      createdAt: true,
      repository: {
        select: {
          name: true,
          _count: {
            select: {
              pullRequests: true
            }
          }
        }
      }
    },
  }))
);


export const allGroupedByRepository = async (where = {}) => {
  const pullRequests = await prisma.pullRequest.findMany({
    where,
    select: {
      id: true,
      title: true,
      author: {
        select: { username: true }
      },
      updatedAt: true,
      createdAt: true,
      repository: {
        select: {
          name: true,
        }
      }
    },
  });

  const groupedPullRequests = pullRequests.reduce((grouped, currentPullRequest) => {
    const repoName = currentPullRequest.repository.name;
    const repositoryIndexInGrouped = grouped.findIndex((repo) => {
      return (repo?.name === repoName);
    });
    const currentRepoInGroups = grouped[repositoryIndexInGrouped];
    const groupedWithoutCurrent = grouped.filter((_, idx) => (idx !== repositoryIndexInGrouped));

    return [
      ...groupedWithoutCurrent,
      {
        ...currentPullRequest.repository,
        pullRequests: [
          ...(currentRepoInGroups?.pullRequests || []),
          currentPullRequest
        ]
      }
    ];
  }, []);

  return groupedPullRequests
};

export const getByTitle = async (title: PullRequest["title"], repository: Repository) =>
  (await prisma.pullRequest.findMany({ where: { title, repositoryId: repository.id } }))[0];

export const create = async (title: PullRequest["title"], repository: Repository, user: User, attributes = {}) => {
  log('Creating pull request: ' + title + ' for ' + repository.name);
  const data = {
    title,
    repositoryId: repository.id,
    authorId: user.id,
    ...attributes,
  };
  debug('Attributes: ', data)
  return prisma.pullRequest.create({ data });
}

export const createMissing = async (title: PullRequest["title"], repository: Repository, user: any, attributes: any) => {
  if (title.length === 0) {
    return;
  }
  const existingPullRequest = await getByTitle(title, repository)
  const newPullRequest = !existingPullRequest && await create(title, repository, user, attributes);

  return newPullRequest || existingPullRequest;
}
