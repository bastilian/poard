import { Page, PageSection } from '@patternfly/react-core/dist/umd/react-core';
import Header from '../Header';

const Layout = ({ children }) => (
  // TODO Add a sidebar
  // The sidebar should allow list saved filters as a start
  <Page header={<Header />}>
    <PageSection id='main'>
      {children}
    </PageSection>
  </Page>
)

export default Layout;
