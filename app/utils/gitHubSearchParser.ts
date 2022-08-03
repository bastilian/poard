const TAG_DELIMITER = ':';

const isTaggedQuery = (queryPart: string) =>
  queryPart.search(TAG_DELIMITER) === -1;

const deduplicate = (array: unknown[]) =>
  [...new Set(array)];

const queryPartsTaggedWith = (queryParts: string[], tag: (string | string[])) => (
  queryParts.filter((queryPart) =>
    ((Array.isArray(tag) ? tag : [tag]).includes(queryPart.split(TAG_DELIMITER)[0])))
);

const textQueries = (queryParts: string[]) => ({
  text: queryParts.reduce((allTextPartsString, queryPart) => (
    allTextPartsString + (isTaggedQuery(queryPart) ? `${queryPart} ` : '')
  ), '').trimEnd()
});

const queryObject = (query: string[], key: string, tags: (string | string[])) => {
  const queryParts = queryPartsTaggedWith(query, tags);
  const values = deduplicate(queryParts.map((part) => part.split(TAG_DELIMITER)[1]));
  return values.length > 0 ? {
    [key]: values
  } : {};
};

// TODO Add Support for:
// * draft - https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests#search-for-draft-pull-requests
// * review(-*) -  https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests#search-by-pull-request-review-status-and-reviewer
// * team/mention
// See for more: https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests
export const queryMap = {
  organisations: 'org',
  users: ['user', 'author'],
  repositories: 'repo',
  // TODO these need more data imported to be implemented.
  // assignees: 'assignee',
  // commenters: 'commenter',
  // labels: 'label',
  // comments: 'comments', // comment count, actually.
};

const parse = (query: string) => {
  const queryArray = query.split(' ');

  return {
    ...textQueries(queryArray),
    ...Object.entries(queryMap).reduce((currentQueryObject, [key, tags]) => (
      { ...currentQueryObject, ...queryObject(queryArray, key, tags) }
    ), {}),
  };
};

export default parse;
