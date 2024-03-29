import React from 'react';
import { render, screen } from '@testing-library/react';
import Pannier from './Pannier';

test('renders learn react link', () => {
  render(<Pannier />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
