import { describe, expect, it } from 'vitest';
import parse from './gitHubSearchParser';

describe('parse', () => {
  const textQuery = 'new addition';
  const repository = 'test-repo';
  const repositoryQuery = 'repo:' + repository;
  const author = 'bastilian';
  const authorQuery = 'author:' + author;
  const userQuery = 'user:' + author;
  const organisation = 'BastilianOrg';
  const organisationQuery = 'org:' + organisation;

  it('returns a search object', () => {
    const query = [textQuery, repositoryQuery, authorQuery].join(' ');
    expect(parse(query)).toMatchSnapshot();
  });

  describe('text queries', () => {
    it('returns query object for text', () => {
      expect(parse(textQuery).text).toEqual(textQuery);
    });

    it('ignores "tagged" (aka with ":") query parts', () => {
      const queryString = [textQuery, repositoryQuery, authorQuery].join(' ');
      expect(parse(queryString).text).toEqual(textQuery);
    });
  });

  describe('repo queries ', () => {
    it('returns query object with repositories', () => {
      expect(parse(repositoryQuery).repositories).toEqual([repository]);
    });

    it('can return multiple repositories', () => {
      const repositories = ['test-repo1', 'test-repo2', 'test-repo3'];
      expect(parse(repositories.map((repo) => `repo:${repo}`).join(' ')).repositories).toEqual(repositories);
    });

    it('can return multiple repositories, but no duplicates', () => {
      const repositories = ['test-repo1', 'test-repo2', 'test-repo3'];
      const duplicateRepositories = [...repositories, ...repositories];

      expect(parse(duplicateRepositories.map((repo) => `repo:${repo}`).join(' ')).repositories).toEqual(repositories);
    });
  });

  describe('author/user queries ', () => {
    it('returns query object with users', () => {
      expect(parse(userQuery).users).toEqual([author]);
    });

    it('returns query object with users for author query', () => {
      expect(parse(authorQuery).users).toEqual([author]);
    });

    it('can return multiple users', () => {
      const users = ['user1', 'user2', 'user3'];
      expect(parse(users.map((user) => `user:${user}`).join(' ')).users).toEqual(users);
    });

    it('can return multiple users, but no duplicates', () => {
      const users = ['user1', 'user2', 'user3'];
      const duplicateUsers = [...users, ...users];

      expect(parse(duplicateUsers.map((user) => `user:${user}`).join(' ')).users).toEqual(users);
    });
  });


  describe('org queries ', () => {
    const organisations = ['test-org1', 'test-org2', 'test-org3'];
    it('returns query object with organisations', () => {
      expect(parse(organisationQuery).organisations).toEqual([organisation]);
    });

    it('can return multiple organisations', () => {
      expect(parse(organisations.map((org) => `org:${org}`).join(' ')).organisations).toEqual(organisations);
    });

    it('can return multiple organisations, but no duplicates', () => {
      const duplicateOrganisations = [...organisations, ...organisations];

      expect(parse(duplicateOrganisations.map((org) => `org:${org}`).join(' ')).organisations).toEqual(organisations);
    });
  });
});
