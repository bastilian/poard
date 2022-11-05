import { prisma } from '~/utils/db.server';
import { log } from '~/utils/log';

// TODO This should really be Organisation
import type { Owner } from '@prisma/client';

export const all = () => prisma.owner.findMany();

export const getByName = async (name: Owner['name']) =>
  prisma.owner.findUnique({ where: { name } });

export const create = async (name: Owner['name']) => {
  log('Creating owner: ' + name);

  return prisma.owner.create({
    data: {
      name,
    },
  });
};

export const deleteByName = async (name: Owner['name']) =>
  prisma.owner.delete({ where: { name } });

export const createMissing = async (name: string) => {
  if (name.length === 0) {
    return;
  }
  const existingOwner = await getByName(name);
  !existingOwner && (await create(name));
};
