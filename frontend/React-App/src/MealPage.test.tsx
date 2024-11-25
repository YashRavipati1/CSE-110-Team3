import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MealPage from './pages/MealPage';
import { getNutritionForUser } from './api/nutrition';  // Mock this function if used in the component

jest.mock('./api/nutrition', () => ({
    getNutritionForUser: jest.fn()
}));

test('renders add meal button', () => {
  render(
      <BrowserRouter>
          <MealPage/>
      </BrowserRouter>
  );
  const addBtn = screen.getByText(/Add Meal/i);
  expect(addBtn).toBeInTheDocument();
});

