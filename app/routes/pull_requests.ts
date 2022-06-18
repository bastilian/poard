import { json } from "@remix-run/node";
import * as pullRequest from '~/models/pull_request.server';

export const loader = async () => {
  const jsonData = await pullRequest.allGroupedByRepository();
  return json(jsonData);
}

export const action = async ({ request }) => {
  const form = (await request.formData())
  const users = (await form.get('users'))?.split(',');
  const repositories = (await form.get('repositories'))?.split(',');
  console.log(await form.get('users'))
  const where = {
    AND: {
      ...users?.length > 0 ? {
        author: {
          username: {
            in: users
          }
        }
      } : {},
      ...repositories?.length > 0 ? {
        repository: {
          name: {
            in: repositories
          }
        }
      } : {},
    }
  };
  console.log('WHERE', where)
  const jsonData = await pullRequest.allGroupedByRepository(where)

  return json(jsonData);
}
