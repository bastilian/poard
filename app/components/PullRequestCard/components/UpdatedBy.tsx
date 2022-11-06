import React from 'react';
import { Text } from '@patternfly/react-core/dist/umd/react-core';

const UpdatedBy = ({ reporter }) => {
  return (
    <span className="updatedBy">
      Updated by{' '}
      <Text component="strong" style={{ color: 'dodgerblue', opacity: '0.7' }}>
        {reporter}
      </Text>
    </span>
  );
};

export default UpdatedBy;
