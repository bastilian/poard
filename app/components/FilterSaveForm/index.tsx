import { useState, useRef, useEffect } from 'react';
import {
  NavItem,
  Text,
  TextInput,
} from '@patternfly/react-core/dist/umd/react-core';
import { SaveIcon } from '@patternfly/react-icons';

interface FilterSaveFormProps {
  filterStore?: unknown;
}

// TODO Add filtername validation
// TODO Add save on enter
// TODO Add canceling (on ESC as well)
const FilterSaveForm: React.FC<FilterSaveFormProps> = ({ filterStore }) => {
  const filterNameInput = useRef();
  const [saveMode, setSaveMode] = useState(false);
  const [filterName, setFilterName] = useState();

  const { hasFilterToSave, saveFilter } = filterStore || {};
  const filterCanBeSaved = filterName?.length > 0;

  const trySaveFilter = () => {
    if (!saveMode) {
      setSaveMode(true);
    } else {
      filterCanBeSaved && saveFilter(filterName);
      setSaveMode(false);
      setFilterName(undefined);
    }
  };

  useEffect(() => {
    filterNameInput?.current?.focus();
  }, [saveMode]);

  return (
    <>
      {saveMode && (
        <NavItem>
          <TextInput
            ref={filterNameInput}
            id="filterName"
            aria-label="Filter name field"
            onChange={(value, ...rest) => {
              setFilterName(value);
            }}
          />
        </NavItem>
      )}
      {hasFilterToSave && (
        <NavItem onClick={trySaveFilter}>
          <Text
            style={{
              cursor: 'pointer',
              ...((filterCanBeSaved && { opacity: '1' }) || {
                opacity: '.5',
                fontSize: '.9em',
              }),
            }}
          >
            <SaveIcon />
            &nbsp;Save filter
          </Text>
        </NavItem>
      )}
    </>
  );
};

export default FilterSaveForm;
