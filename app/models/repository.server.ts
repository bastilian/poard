import { prisma } from "~/utils/db.server";
import { log, debug } from '~/utils/log';

import type { Repository } from "@prisma/client";

export const all = (where = {}) =>
  prisma.repository.findMany({
    where,
    select: {
      name: true,
      owner: true,
      _count: {
        select: {
          pullRequests: true
        }
      },
      pullRequests: {
        select: {
          id: true, title: true, author: true, updatedAt: true, createdAt: true, repository: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    },
  });

export const getByName = async (name: Repository["name"], ownerId: Repository["ownerId"]) =>
  (await prisma.repository.findMany({ where: { name, ownerId }, include: { owner: true } }))[0];

export const create = async (
  name: Repository["name"],
  ownerId: Repository['ownerId'],
  attributes = {}
) => {
  log('Creating repository: ' + name);
  const data = {
    name,
    ownerId,
    ...attributes,
  };
  debug('Attributes: ', data);

  return prisma.repository.create({
    data,
  });
}
export const createMissing = async (
  name: Repository['name'],
  ownerId: Repository['ownerId'],
  attributes: object = {},
) => {
  if (name.length === 0) {
    return;
  }
  return !(await getByName(name, ownerId)) && await create(name, ownerId, attributes)
}
