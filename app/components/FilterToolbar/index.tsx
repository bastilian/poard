import { SelectOption, SelectVariant, Spinner, TextInput, Toolbar, ToolbarContent, ToolbarGroup, ToolbarItem } from '@patternfly/react-core/dist/umd/react-core';
import FilterSelect from '~/components/FilterSelect';
import useFilterFetcher from './hooks/useFilterFetcher';
import useFilters from './hooks/useFilters';

// TODO Add a way to clear filters
const FilterToolbar = ({ onSubmit, isFetching }) => {
  const filters = useFilterFetcher();
  const { selectedFilters, setFilter } = useFilters(onSubmit);

  return (
    <Toolbar className="tools" isSticky>
      <ToolbarContent>

        <ToolbarGroup>
          <TextInput iconVariant="search" type="search" />
        </ToolbarGroup>

        {Object.entries(filters).map(([name, values]) => (
          <ToolbarGroup key={`filter-${name}`}>
            <ToolbarItem>
              <FilterSelect
                variant={SelectVariant.typeaheadMulti}
                aria-label={name.replace(/^\w/, (c) => c.toUpperCase())}
                onSelect={(_, value) => { setFilter(name, value) }}
                selections={selectedFilters?.[name]}
                placeholderText={`Select ${name}`}
                isPlain
              >
                {values.map((value) => <SelectOption key={value} value={value} />)}
              </FilterSelect>
            </ToolbarItem>
          </ToolbarGroup>
        ))}
        {isFetching && <ToolbarItem style={{
          position: 'absolute',
          right: '20px',
          top: '8px'
        }}>
          <Spinner size="lg" />
        </ToolbarItem>}
      </ToolbarContent>
    </Toolbar>
  )
}

export default FilterToolbar;
