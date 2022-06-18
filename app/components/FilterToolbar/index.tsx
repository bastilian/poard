import { useState, useEffect } from 'react';
import { Button, Toolbar, ToolbarItem, ToolbarContent, SelectOption, SelectVariant, Spinner } from '@patternfly/react-core/dist/umd/react-core';
import { RedoIcon, MinusCircleIcon } from '@patternfly/react-icons';

import PopOutLabel from '~/components/PopOutLabel';
import FilterSelect from '~/components/FilterSelect';
import FilterSave from '~/components/FilterSave';

const FilterToolbar = ({ filters, onSubmit, isFetching }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const setFilter = (name, value, ...rest) => {
    setSelectedFilters((currentFilters) => {
      const isSelected = (currentFilters[name] || []).indexOf(value) !== -1;
      const newSelection = isSelected ?
        (currentFilters[name] || []).filter((selectedValue) => selectedValue !== value) :
        [...(currentFilters[name] || []), value];

      return {
        ...currentFilters,
        [name]: newSelection
      }
    })
  }

  useEffect(() => {
    onSubmit(selectedFilters);
  }, [selectedFilters])

  return (
    <Toolbar className="tools">
      <ToolbarContent>
        {Object.entries(filters).map(([name, values]) => (
          <>
            <ToolbarItem variant="label">
              {name.replace(/^\w/, (c) => c.toUpperCase())}
            </ToolbarItem>
            <ToolbarItem>
              <FilterSelect
                variant={SelectVariant.checkbox}
                aria-label={name.replace(/^\w/, (c) => c.toUpperCase())}
                onSelect={(_, value) => { setFilter(name, value) }}
                selections={selectedFilters[name]}
                placeholderText={`Select ${name}`}
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
        {/*

          <Button variant="plain" onClick={(e) => (e)}>
            <RedoIcon />
          </Button>
        <ToolbarItem className="filterSaveTb">
          {false ? <div className="filterSavePart">
            <Button variant="plain" onClick={() => { }}>
              <MinusCircleIcon />
            </Button>
          </div> : <div className="filterSavePart">
            <FilterSave filteredPullRequestsCount={1} onSave={() => { }} />
          </div>
          }

          <div className="filterSavePart">
            <PopOutLabel label={1} popOutLabel={0} />
          </div>

          <Button onClick={() => onSubmit?.()}>SAVE</Button>
        </ToolbarItem> */}
      </ToolbarContent>
    </Toolbar>
  )
}

export default FilterToolbar;
