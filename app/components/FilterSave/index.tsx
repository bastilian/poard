import { Button, TextInput } from '@patternfly/react-core/dist/umd/react-core';
import { SaveIcon, TimesIcon } from '@patternfly/react-icons';
import { useState } from 'react';

const withVisibleClass = (className, count) => (
  count > 0 ? `${className} visible` : className
);

const FilterSave = ({ filteredPullRequestsCount, onSave }) => {
  const [inSaveMode, setSaveMode] = useState(false);
  const [filterName, setFilterName] = useState("")

  const saveHandler = (e) => {
    e.preventDefault();
    if (!inSaveMode) {
      setSaveMode(true)
    } else {
      onSave?.(filterName)
      setSaveMode(false)
      setFilterName('')
    }
  }

  const cancelHandler = (e) => {
    e.preventDefault();
    setFilterName("");
    setSaveMode(false);
  }

  const onChangeInput = (value, e) => {
    e.preventDefault();
    setFilterName(value);
  };

  return <>
    <label className="saveLabel">
      {inSaveMode ? 'Save filter as ' : ''}
      <TextInput value={filterName} className={withVisibleClass('saveInput', inSaveMode ? 1 : 0)} onChange={onChangeInput} />
    </label>

    <Button variant="plain" onClick={cancelHandler} className={withVisibleClass('cancelIcon', inSaveMode ? 1 : 0)}>
      <TimesIcon />
    </Button>

    <Button variant="plain" onClick={saveHandler} className={withVisibleClass('saveIcon', filteredPullRequestsCount)}>
      <SaveIcon color={inSaveMode ? '#2B9AF3' : 'grey'} />
    </Button>
  </>;
}

export default FilterSave;
