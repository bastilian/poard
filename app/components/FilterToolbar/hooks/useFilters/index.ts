import { useContext, useEffect } from 'react';
import AppContext from '~/utils/appContext';

const useFilters = (onSubmit) => {
  const appContext = useContext(AppContext);
  const {
    filters,
    state: {
      current: { filters: selectedFilters },
      setAppState,
    },
  } = appContext || {};

  const setFilter = (name, value) => {
    setAppState('filters', (currentFilters) => {
      const { [name]: currentSelection, ...otherFilters } =
        currentFilters || {};
      const isSelected = (currentSelection || []).indexOf(value) !== -1;
      const currentCleanSelection = (currentSelection || []).filter(
        (selectedValue: string) => selectedValue !== value
      );
      const newSelection = isSelected
        ? currentCleanSelection
        : [...currentCleanSelection, value];

      const newFilters = {
        ...otherFilters,
        ...(newSelection.length > 0 ? { [name]: newSelection } : {}),
      };

      onSubmit?.(newFilters);
      return newFilters;
    });
  };

  useEffect(() => {
    onSubmit?.(selectedFilters);
    // eslint-disable-next-line
  }, [selectedFilters])

  return {
    filters,
    selectedFilters,
    setFilter,
  };
};

export default useFilters;
