import { Page, PageSection } from '@patternfly/react-core/dist/umd/react-core';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const Layout = ({ children }) => (
  <Page header={<Header />} sidebar={<Sidebar />}>
    <PageSection id='main' style={{ overflowY: 'auto', height: '100%' }}>
      {children}
    </PageSection>
  </Page>
)

export default Layout;
