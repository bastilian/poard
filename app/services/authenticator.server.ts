import { Authenticator } from "remix-auth";
import { sessionStorage } from "./sessions.server";
import { GitHubStrategy } from "remix-auth-github";
import { DOMAIN, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, SSL } from '../../config';

export default (() => {
  const authenticator = new Authenticator(sessionStorage);

  const gitHubStrategy = new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: `http${SSL ? 's' : ''}://${DOMAIN}:3000/auth/github/callback`,
    },
    async ({ profile }) => {
      // Get the user data from your DB or API using the tokens and profile
      return profile;
    }
  );

  authenticator.use(gitHubStrategy);

  return authenticator
})();
