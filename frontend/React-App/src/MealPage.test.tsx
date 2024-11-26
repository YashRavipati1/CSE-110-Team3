import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MealPage from '../src/pages/MealPage'; // Adjust based on the actual location of your MealPage component
import AddMealPage from '../src/pages/AddMeal'; // Adjust based on the actual location of your AddMealPage component
import Button from '../src/components/Button'; // Adjust based on the actual location of your Button component

describe('UI Component Tests', () => {
  test('renders Add Meal button on MealPage', () => {
    render(
      <BrowserRouter>
        <MealPage />
      </BrowserRouter>
    );
    const addButton = screen.getByText(/Add Meal/i); // Replace with the exact button text
    expect(addButton).toBeInTheDocument();
  });
});