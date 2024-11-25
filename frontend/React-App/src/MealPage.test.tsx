import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MealPage from './pages/MealPage';
import { getNutritionForUser } from './api/nutrition'; // Import to override its implementation

// Mocking modules
jest.mock('./api/nutrition', () => ({
    getNutritionForUser: jest.fn()
}));

// Assuming you have some context provider for authentication status
jest.mock('./contexts/AuthContext', () => ({
    useAuth: () => ({ isAuthenticated: true }) // Simulate a logged-in user
}));

// Sample test to check if the Add Meal button renders correctly
test('renders add meal button', async () => {
  (getNutritionForUser as jest.Mock).mockResolvedValueOnce({
    success: true,
    data: [{ id: '1', name: 'Test Meal', calories: 500, user: 'testuser@example.com', date: '2023-01-01' }]
  });

  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MealPage />} />
      </Routes>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/Add Meal/i)).toBeInTheDocument();
  });
});

// Test to check if no meals are displayed when the user has no meals
test('displays no meals message when meal list is empty', async () => {
  (getNutritionForUser as jest.Mock).mockResolvedValueOnce({ success: true, data: [] });

  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MealPage />} />
      </Routes>
    </BrowserRouter>
  );

  const noMealsMessage = await screen.findByText(/No meals to display/i);
  expect(noMealsMessage).toBeInTheDocument();
});

