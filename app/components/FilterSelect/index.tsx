import React, { useState } from 'react';
import { Select } from '@patternfly/react-core';

interface FilterSelectProps {
  children: React.ReactNode;
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
