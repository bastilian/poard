export const debounce = (func, wait) => {
  let timeout
  return (...params) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...params)
    }, wait)
  }
}

export const buildFilterValues = (data) => {
  const repositories = data.filter(({ pullRequests }) =>
    pullRequests.length > 0
  ).map(({ name }) => (name)).sort();
  const users = [...new Set(
    data.flatMap(({ pullRequests }) =>
      pullRequests.map((
        { author: { username } }
      ) => username)
    )
  )].sort();

  return {
    repositories,
    users
  }
}
