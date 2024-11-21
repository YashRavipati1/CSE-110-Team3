import React from 'react';
import { render, screen } from '@testing-library/react';
import { Login } from './pages/Login';
import { BrowserRouter } from 'react-router-dom';
import MealPage from './pages/MealPage';

test('renders add meal button', () => {
    render(<BrowserRouter>
      <MealPage/>
    </BrowserRouter>);
    const addBtn = screen.getByText(/Add Meal/i);
    expect(addBtn).toBeInTheDocument();
  });
  