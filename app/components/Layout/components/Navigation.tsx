import { useState } from 'react';
import { Link } from "@remix-run/react";
import { Nav, NavItem, NavList, NavGroup, Text } from '@patternfly/react-core/dist/umd/react-core';
import { BookmarkIcon, SaveIcon } from '@patternfly/react-icons';
import useFilterStore from '~/hooks/useFilterStore';
import FilterSaveForm from '~/components/FilterSaveForm'

// TODO Add way to delete filters
const Navigation = () => {
  const filterStore = useFilterStore();
  const { filters, hasFilterToSave, saveFilter } = filterStore;

  const onSelect = () => { };
  console.log(filters)
  return <Nav onSelect={onSelect}>
    <NavList>
      <NavGroup title={<Text><BookmarkIcon />&nbsp;Saved filters</Text>}>

        {filters?.length === 0 && <NavItem itemId="no-filters">
          {/* TODO This navitem should not get highlighted when hovering. */}
          <Text style={{ opacity: '.5' }}>No saved filters</Text>
        </NavItem>}

        {filters?.length > 0 && filters.map((filter) =>
          <NavItem itemId={filter.name} key={filter.name} isActive={false}>
            <Link to={'/filter/' + filter.name}>{filter.name}</Link>
          </NavItem>
        )}

        <FilterSaveForm filterStore={filterStore} />

      </NavGroup>
    </NavList>
  </Nav >
}

export default Navigation;
