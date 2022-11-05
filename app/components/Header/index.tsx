import { Link } from '@remix-run/react';
import {
  Masthead,
  MastheadMain,
  Title,
  Text,
} from '@patternfly/react-core/dist/umd/react-core';

const Header: React.FC = () => (
  <Masthead backgroundColor="dark-400">
    <MastheadMain>
      <Title headingLevel="h1">
        <Link to="/">Poard</Link>
      </Title>
      <Text style={{ fontWeight: 'normal !important' }}>
        &nbsp;- pull request manager
      </Text>
    </MastheadMain>
  </Masthead>
);

export default Header;
