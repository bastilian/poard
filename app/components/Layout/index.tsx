import { Page, PageSection } from '@patternfly/react-core/dist/umd/react-core';
import Header from '../Header';

const Layout = ({ children }) => (
  <Page header={<Header />}>
    <PageSection id='main'>
      {children}
    </PageSection>
  </Page>
)

export default Layout;
