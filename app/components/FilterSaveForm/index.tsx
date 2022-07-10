import { useState, useRef, useEffect } from 'react';
import { NavItem, Text, TextInput } from '@patternfly/react-core/dist/umd/react-core';
import { SaveIcon } from '@patternfly/react-icons';

// TODO Add filtername validation
const FilterSaveForm = ({ filterStore }) => {
  const filterNameInput = useRef();
  const [saveMode, setSaveMode] = useState(false)
  const [filterName, setFilterName] = useState();

  const { hasFilterToSave, saveFilter } = filterStore;
  const filterCanBeSaved = filterName?.length > 0;

  const trySaveFilter = () => {
    if (!saveMode) {
      setSaveMode(true)

    } else {
      filterCanBeSaved && saveFilter(filterName)
      setSaveMode(false)
    }
  }

  useEffect(() => {
    filterNameInput?.current?.focus();
  }, [filterNameInput])

  return (
    <>
      {saveMode && <NavItem>
        <TextInput
          ref={filterNameInput}
          id="filterName"
          aria-label="Filter name field"
          onChange={(value, ...rest) => {
            console.log(value, rest)
            setFilterName(value)
          }}
        />
      </NavItem>}
      {hasFilterToSave && <NavItem onClick={trySaveFilter}>
        <Text style={{
          cursor: 'pointer',
          ...(filterCanBeSaved && { opacity: '1' }) || {
            opacity: '.5', fontSize: '.9em'
          },
        }}>
          <SaveIcon />&nbsp;Save filter</Text>
      </NavItem>}
    </>
  )
}

export default FilterSaveForm;
