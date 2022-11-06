import React, { useState } from 'react';
import {
  ExpandableSection,
  SelectOption,
  SelectVariant,
  Spinner,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core/dist/umd/react-core';
import FilterSelect from '~/components/FilterSelect';
import useFilterFetcher from './hooks/useFilterFetcher';
import useFilters from './hooks/useFilters';
import GitHubSearchInput from './components/GitHubSearchInput';

// TODO Add a way to clear filters
const FilterToolbar = ({ onSubmit, isFetching }) => {
  const filters = useFilterFetcher();
  const [isAdvanceSearchExpanded, setIsAdvanceSearchExpanded] = useState(false);

  const onToggleAdvanceSearch = (isExpanded: boolean) => {
    setIsAdvanceSearchExpanded(isExpanded);
  };
  const { selectedFilters, setFilter } = useFilters(onSubmit);

  return (
    <Toolbar className="tools" isSticky>
      <ToolbarContent>
        {Object.entries(filters).map(([name, values]) => (
          <ToolbarGroup key={`filter-${name}`}>
            <ToolbarItem>
              <FilterSelect
                variant={SelectVariant.typeaheadMulti}
                aria-label={name.replace(/^\w/, (c) => c.toUpperCase())}
                onSelect={(_, value) => {
                  setFilter(name, value);
                }}
                selections={selectedFilters?.[name]}
                placeholderText={`Select ${name}`}
                isPlain
              >
                {values.map((value) => (
                  <SelectOption key={value} value={value} />
                ))}
              </FilterSelect>
            </ToolbarItem>
          </ToolbarGroup>
        ))}
        {isFetching && (
          <ToolbarItem
            style={{
              position: 'absolute',
              right: '20px',
              top: '8px',
            }}
          >
            <Spinner size="lg" />
          </ToolbarItem>
        )}

        <ExpandableSection
          style={{ width: '100%' }}
          onToggle={onToggleAdvanceSearch}
          toggleText={
            <small>
              {isAdvanceSearchExpanded
                ? 'Hide "advanced" search'
                : 'Show "advanced" search'}
            </small>
          }
        >
          <ToolbarGroup>
            <GitHubSearchInput />
          </ToolbarGroup>
        </ExpandableSection>
      </ToolbarContent>
    </Toolbar>
  );
};

export default FilterToolbar;
