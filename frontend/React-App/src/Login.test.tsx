import React from 'react';
import { render, screen } from '@testing-library/react';
import { Login } from './pages/Login';
import { BrowserRouter } from 'react-router-dom';

test('renders login button', () => {
  render(<BrowserRouter>
    <Login />
  </BrowserRouter>);
  const linkElement = screen.getByText(/Sign in with Google/i);
  expect(linkElement).toBeInTheDocument();
});
