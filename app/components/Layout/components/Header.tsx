import {
  Grid,
  GridItem,
  Masthead,
  MastheadContent,
  MastheadMain,
  Nav,
  Title,
  Text,
} from '@patternfly/react-core/dist/umd/react-core';

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
      <Grid>
        <GridItem span={10}>
          <Nav variant="horizontal">
            {/* <NavList>
              <NavItem key={2} itemId={2} isActive={false}>
                <a href="/pull-requests">Pull Requests</a>
              </NavItem>
            </NavList> */}
          </Nav>
        </GridItem>
      </Grid>
    </MastheadContent>
  </Masthead>
);

export default Header;
