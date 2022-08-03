import React from 'react';
import { Nav, NavItem, NavList, NavGroup, Text } from '@patternfly/react-core/dist/umd/react-core';
import { BookmarkIcon } from '@patternfly/react-icons';
import useFilterStore from '~/hooks/useFilterStore';
import FilterSaveForm from '~/components/FilterSaveForm';

// TODO Add way to delete filters
const Navigation: React.FC = () => {
  const filterStore = useFilterStore();
  const { filters, selectFilter } = filterStore;

  return <Nav>
    <NavList>
      <NavGroup title={<Text><BookmarkIcon />&nbsp;Saved filters</Text>}>

        {filters?.length === 0 && <NavItem itemId="no-filters">
          {/* TODO This navitem should not get highlighted when hovering. */}
          <Text style={{ opacity: '.5' }}>No saved filters</Text>
        </NavItem>}
        {/* TODO Allow reordering and maybe grouping of filters */}
        {filters?.length > 0 && filters.map((filter) =>
          <NavItem itemId={filter.name} key={filter.name} isActive={false} onClick={() => selectFilter(filter.name)}>
            {filter.name}
          </NavItem>
        )}

        <FilterSaveForm filterStore={filterStore} />

      </NavGroup>
    </NavList>
  </Nav >;
};

export default Navigation;
