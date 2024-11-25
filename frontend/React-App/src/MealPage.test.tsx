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

  test('renders Add Meal card on AddMealPage', () => {
    render(
      <BrowserRouter>
        <AddMealPage />
      </BrowserRouter>
    );
    const mealCard = screen.getByText(/Add Meal/i); // Replace with specific text on the card
    expect(mealCard).toBeInTheDocument();
  });

  test('renders a reusable button with text', () => {
    render(<Button text="Save Meal" size="large" />);
    const button = screen.getByText(/Save Meal/i);
    expect(button).toBeInTheDocument();
  });
});
