import { useState, useEffect, useContext } from 'react';
import { Button, Toolbar, ToolbarItem, ToolbarContent, SelectOption, SelectVariant, Spinner } from '@patternfly/react-core/dist/umd/react-core';
import { RedoIcon, MinusCircleIcon } from '@patternfly/react-icons';
import AppContext from '~/utils/appContext';
import PopOutLabel from '~/components/PopOutLabel';
import FilterSelect from '~/components/FilterSelect';
import FilterSave from '~/components/FilterSave';

// TODO Add a way to clear filters
const FilterToolbar = ({ onSubmit, isFetching }) => {
  const appContext = useContext(AppContext);
  const { filters, state: appState } = appContext || {};

  const [selectedFilters, setSelectedFilters] = useState({});

  const setFilter = (name, value, ...rest) => {
    setSelectedFilters((currentFilters) => {
      const { [name]: currentSelection, ...otherFilters } = currentFilters || {};
      const isSelected = (currentSelection || []).indexOf(value) !== -1;
      const currentCleanSelection = (currentSelection || []).filter((selectedValue) => selectedValue !== value)
      const newSelection = isSelected ?
        currentCleanSelection :
        [...currentCleanSelection, value];

      const newFilters = {
        ...otherFilters,
        ...newSelection.length > 0 ? { [name]: newSelection } : {}
      }

      appState.setAppState('selectedFilters', newFilters);
      onSubmit?.(newFilters);

      return newFilters;
    })
  }

  useEffect(() => {
    setSelectedFilters(appState.current.filters)
    onSubmit?.(appState.current.filters);
  }, [appState.current.filters])

  return (
    <Toolbar className="tools" isSticky>
      <ToolbarContent>
        {Object.entries(filters).map(([name, values]) => (
          <>
            <ToolbarItem variant="label">
              {name.replace(/^\w/, (c) => c.toUpperCase())}
            </ToolbarItem>
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
          </>
        ))}
        {isFetching && <ToolbarItem style={{
          position: 'absolute',
          right: '20px',
          top: '8px'
        }}>
          <Spinner size="lg" isSvg />
        </ToolbarItem>}
      </ToolbarContent>
    </Toolbar>
  )
}

export default FilterToolbar;
