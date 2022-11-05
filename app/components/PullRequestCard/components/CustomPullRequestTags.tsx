import type { PullRequest } from '@prisma/client';
import { CUSTOM_PR_TAGS } from '~/../config';
import CustomTag from './CustomTag';

interface CustomPullRequestTagsProps {
  pullRequest: PullRequest;
}

const CustomPullRequestTags: React.FC<CustomPullRequestTagsProps> = ({
  pullRequest,
}) =>
  (CUSTOM_PR_TAGS || []).map((tagFunc, idx) => (
    <span key={`custom-tag-${idx}`}>
      {' '}
      <CustomTag tagFunc={tagFunc} pullRequest={pullRequest} />
    </span>
  ));

export default CustomPullRequestTags;
