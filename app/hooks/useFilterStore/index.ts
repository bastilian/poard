import { useContext, useMemo } from 'react';
import AppContext from '~/utils/appContext';
import useLocalStorage from '~/hooks/useLocalStorage';

const useFilterStore = () => {
  const { state: appState } = useContext(AppContext);
  const [savedFilters, saveFilter] = useLocalStorage('filters', []);
  const filterToSave = appState?.current?.selectedFilters || {};
  const hasFilterToSave = Object.keys(filterToSave).length > 0;
  const saveNewFilter = (name) => {
    saveFilter([
      ...savedFilters,
      { name, filter: filterToSave }
    ])
  };

  const selectFilter = useMemo(() => (name) => {
    const filterToSelect = savedFilters.find(({ name: savedName }) => savedName === name)
    appState.setAppState('filters', filterToSelect.filter);
  }, [savedFilters]);

  return {
    hasFilterToSave,
    filters: savedFilters,
    saveFilter: saveNewFilter,
    selectFilter
  }
}

export default useFilterStore;
