import { json } from "@remix-run/node";
import * as repository from '~/models/repository.server';

export const loader = async () => {
  const jsonData = await repository.all();
  return json(jsonData);
};

export const action = async ({ request }) => {
  const form = (await request.formData());
  const users = form.getAll('users');
  const repositories = form.getAll('repositories');
  console.log(users, repositories);
  const where = {
    AND: {
      ...users.length > 0 ? {
        pullRequests: {
          some: {
            author: {
              username: {
                in: users
              }
            }
          }
        }
      } : {},
      ...repositories.length > 0 ? {
        name: {
          in: repositories
        }
      } : {},
    }
  };
  console.log(JSON.stringify(where));
  const jsonData = await repository.all(where);
  const jsonResult = jsonData.filter((repo) => {
    return repo.pullRequests.length > 0;
  });

  return json(jsonResult);
};
