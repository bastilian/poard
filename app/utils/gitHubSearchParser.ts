const TAG_DELIMITER = ':';

const isTaggedQuery = (queryPart: string) =>
  queryPart.search(TAG_DELIMITER) === -1;

const deduplicate = (array: unknown[]) =>
  [...new Set(array)];

const queryPartsTaggedWith = (queryParts: string[], tag: (string | string[])) => {
  const tags = Array.isArray(tag) ? tag : [tag];

  return queryParts.filter((queryPart) => {
    const [tag] = queryPart.split(TAG_DELIMITER);
    return tags.includes(tag);
  });
};

const textQueries = (queryParts: string[]) => ({
  text: queryParts.reduce((allTextPartsString, queryPart) => {
    return allTextPartsString + (isTaggedQuery(queryPart) ? `${queryPart} ` : '');
  }, '').trimEnd()
});

const repositoryQueries = (repositoryQueryParts: string[]) => {
  const repositories = deduplicate(repositoryQueryParts.map((part) => part.split(TAG_DELIMITER)[1]));
  return {
    repositories
  };
};

const userQueries = (userQueryParts: string[]) => {
  const users = deduplicate(userQueryParts.map((part) => part.split(TAG_DELIMITER)[1]));
  return {
    users
  };
};


const parse = (query: string) => {
  const queryParts = query.split(' ');

  return {
    ...userQueries(queryPartsTaggedWith(queryParts, ['user', 'author'])),
    ...repositoryQueries(queryPartsTaggedWith(queryParts, 'repo')),
    ...textQueries(queryParts)
  };
};

export default parse;
