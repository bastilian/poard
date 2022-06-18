import { prisma } from "~/utils/db.server";
import { log, debug } from '~/utils/log';

import type { User } from "@prisma/client";

export const getByUserName = async (username: User["username"]) =>
  (await prisma.user.findMany({
    where: {
      username
    }
  }))[0];

export async function create(username: User["username"], attributes = {}) {
  log('Create user: ', username)
  const data = {
    username,
    ...attributes,
  };
  debug('Attributes: ', data)
  return prisma.user.create({
    data,
  });
}

export async function deleteUserByUsername(username: User["username"]) {
  return prisma.user.delete({ where: { username } });
}

export const createMissing = async (username: User["username"] = '', attributes: any) => {
  // TODO this shouldn't be here.
  if (username.length === 0) {
    return;
  }
  const existingUser = await getByUserName(username);
  const newUser = !existingUser && await create(username, attributes);

  return newUser || existingUser;
}
