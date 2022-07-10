import { useContext } from 'react';
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
  }
  return {
    hasFilterToSave,
    filters: savedFilters,
    saveFilter: saveNewFilter,
  }
}

export default useFilterStore;
