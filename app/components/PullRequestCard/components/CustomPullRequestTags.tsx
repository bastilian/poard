import { CUSTOM_PR_TAGS } from '~/../config';
import { Label } from '@patternfly/react-core/dist/umd/react-core';

const CustomTag = ({ tagFunc, pullRequest }) => {
  const tagResult = tagFunc?.(pullRequest);

  const labelProps = {
    ...tagResult?.labelProps || {}
  };

  return (tagResult &&
    <a href={tagResult.link} target="_blank" rel="noreferrer">
      <Label {...labelProps}>
        {tagResult.label}
      </Label>
    </a>) || ''
}

const CustomPullRequestTags = ({ pullRequest }) =>
  (CUSTOM_PR_TAGS || []).map((tagFunc, idx) =>
    <span key={`custom-tag-${idx}`}>
      {' '}<CustomTag tagFunc={tagFunc} pullRequest={pullRequest} />
    </span>
  )

export default CustomPullRequestTags;
