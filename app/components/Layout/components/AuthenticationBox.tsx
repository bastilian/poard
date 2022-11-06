import { useContext } from 'react';
import {
  Button,
  Flex,
  FlexItem,
} from '@patternfly/react-core/dist/umd/react-core';
import Avatar from 'react-avatar';
import { GithubIcon } from '@patternfly/react-icons';
import AppContext from '~/utils/appContext';

const Authenticated = ({ user }) => (
  <Flex alignSelf={{ default: 'alignSelfCenter' }}>
    <FlexItem>
      <a href="/auth/github/logout">Logout</a> | {user.displayName}

    </FlexItem>
    <FlexItem>
      <Avatar round size="40" githubHandle={user.displayName} />
    </FlexItem>
  </Flex>
)


const Unauthenticated = () => (
  <form action="/auth/github" method="post">
    <Button component="a" href="/auth/github" style={{
      color: 'white',
      background: 'rgb(22, 27, 34)',
      border: '1px solid white',
    }}>
      <GithubIcon size="sm" />&nbsp;Login
    </Button>
  </form>
)

export default () => {
  const { current: { user } } = useContext(AppContext);
  console.log(user)
  return user ? <Authenticated user={user} /> : <Unauthenticated />
}
