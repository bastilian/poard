import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Layout from './';

describe('Layout', () => {
  it('should render', () => {
    const { getByText } = render(<Layout />);
    expect(getByText('Poard').getAttribute('href')).toBe('/');
  });
});
