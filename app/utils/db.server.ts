import { PrismaClient } from "@prisma/client";
import { DATABASE_URL } from '../../config';
import { debug } from '~/utils/log';

let prisma: PrismaClient;

declare global {
  var __db__: PrismaClient;
}

const prismaClient = () =>
  new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  })


if (process.env.NODE_ENV === "production") {
  prisma = prismaClient();
} else {
  if (!global.__db__) {
    global.__db__ = prismaClient();
  }
  prisma = global.__db__;
  debug('Connecting to database', DATABASE_URL)
  prisma.$connect();
}

export { prisma };
