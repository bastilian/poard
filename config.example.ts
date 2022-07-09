export const GITHUB_TOKEN = ""  // Get a poersonal access token with repo permissions from https://github.com/settings/tokens
export const DATABASE_URL = "file:./data.db?connection_limit=1"

export const CUSTOM_PR_TAGS = [
  (pullRequest) => {
    const isDependabot = pullRequest.author.username === 'dependabot[bot]';

    return isDependabot ? { label: '📦' } : undefined
  },
]
