import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import GitHubSearchInput from './GitHubSearchInput';

describe('GitHubSearchInput', () => {
  it('should render', () => {
    const { asFragment } = render(<GitHubSearchInput />);
    expect(asFragment()).toMatchSnapshot();
  });
});
