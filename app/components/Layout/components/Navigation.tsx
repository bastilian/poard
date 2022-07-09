import { useContext } from 'react';
import { Nav, NavItem, NavList, NavGroup } from '@patternfly/react-core/dist/umd/react-core';
import AppContext from '~/utils/appContext';

const Navigation = () => {
  const { state: appState } = useContext(AppContext);
  const hasFilterToSave = Object.keys(appState?.current?.selectedFilters || {})?.length > 0;
  const hasSavedFilters = false;

  const onSelect = () => { };

  return <Nav onSelect={onSelect}>
    <NavList>
      {/* TODO Filters should be saved in local storage */}
      {(hasSavedFilters || hasFilterToSave) && <NavGroup title="Saved filters">
        {hasFilterToSave && <NavItem>
          Save filter
        </NavItem>}
      </NavGroup>}
      {/* <NavItem id="default-link2" to="#default-link2" itemId={1} isActive={false}>
        Link 2
      </NavItem>
      <NavItem id="default-link3" to="#default-link3" itemId={2} isActive={false}>
        Link 3
      </NavItem>
      <NavItem id="default-link4" to="#default-link4" itemId={3} isActive={false}>
        Link 4
      </NavItem> */}
    </NavList>
  </Nav>
}

export default Navigation;
