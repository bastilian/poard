import React from 'react';
import {
  Flex,
  FlexItem,
  Masthead,
  MastheadContent,
  MastheadMain,
  Nav,
  NavList,
  NavItem,
  Title,
  Text,
} from '@patternfly/react-core';
import AuthenticationBox from './AuthenticationBox';

const Header: React.FC = () => (
  <Masthead backgroundColor="dark-400">
    <MastheadMain>
      <Title headingLevel="h1">
        <a href="/">Poard</a>
      </Title>
      <Text style={{ fontWeight: 'normal !important' }}>
        &nbsp;- pull request manager
      </Text>
    </MastheadMain>
    <MastheadContent>
      <Flex style={{ width: '100%' }}>
        <FlexItem>
          <Nav variant="horizontal">
            <NavList>
              <NavItem key={2} itemId={2} isActive={false}>
                <a href="/pull-requests">Pull Requests</a>
              </NavItem>
            </NavList>
          </Nav>
        </FlexItem>
        <FlexItem align={{ default: 'alignRight' }}>
          <AuthenticationBox />
        </FlexItem>
      </Flex>
    </MastheadContent>
  </Masthead>
);

export default Header;
