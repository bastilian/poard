import React from 'react';
import { Label } from '@patternfly/react-core';
import type { PullRequest } from '@prisma/client';

interface CustomTagProps {
  tagFunc: (pullRequest: PullRequest) => {
    label: React.ReactNode;
    link?: string;
    labelProps?: Record<string, unknown>;
  };
  pullRequest: PullRequest;
}

const CustomTag: React.FC<CustomTagProps> = ({ tagFunc, pullRequest }) => {
  const tagResult = tagFunc?.(pullRequest);

  const labelProps = {
    ...(tagResult?.labelProps || {}),
  };

  return (
    (tagResult && (
      <a href={tagResult.link} target="_blank" rel="noreferrer">
        <Label {...labelProps}>{tagResult.label}</Label>
      </a>
    )) || <></>
  );
};

export default CustomTag;
