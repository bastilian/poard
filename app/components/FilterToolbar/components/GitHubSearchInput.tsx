import { TextInput } from '@patternfly/react-core/dist/umd/react-core';

interface GitHubSearchInputProps {
  onChange?: () => void
}

const GitHubSearchInput: React.FC<GitHubSearchInputProps> = ({ onChange }) => {

  const searchOnChange = () => {
    onChange?.();
  };

  return (
    <TextInput
      iconVariant="search"
      type="search"
      onChange={searchOnChange}
    />
  );
};

export default GitHubSearchInput;
