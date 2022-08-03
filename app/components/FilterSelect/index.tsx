import { Select } from '@patternfly/react-core/dist/umd/react-core';
import { useState } from 'react';

interface FilterSelectProps {
  children: React.ReactNode
}

const FilterSelect: React.FC<FilterSelectProps> = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select
      isOpen={isOpen}
      onToggle={() => {
        setIsOpen((isOpen) => !isOpen);
      }}
      {...props}
    >
      {children}
    </Select>
  );
};

export default FilterSelect;
