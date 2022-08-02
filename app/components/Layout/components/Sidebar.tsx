import { PageSidebar } from '@patternfly/react-core/dist/umd/react-core';
import Naviation from './Navigation';

const Sidebar = () => {
  return <PageSidebar nav={<Naviation />} isNavOpen />;
};

export default Sidebar;
