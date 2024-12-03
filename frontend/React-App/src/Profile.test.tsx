import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Profile } from "./pages/Profile";
import { BrowserRouter } from "react-router-dom";
import { DataContext } from "./contexts/DataContext";

test('Correct goals', async () => {
    // Mocks data context for dummy user
    const mockDataContext = {
        currentUser: {
            email: process.env.TEST_USER || '',
            caloriesGoal: 2200,
            proteinGoal: 150,
            fatGoal: 75,
            carbGoal: 160,
            weightGoal: 180,
            firstName: "Dummy",
            lastName: "Account",
            age: 25,
            height: 175,
            weight: 70,
            nutritionRecords: [] as [],
            exerciseRecords: [] as [],
        },
        refetchData: jest.fn(),
    };

    // Mock the useContext hook for the DataContext
    jest.spyOn(React, 'useContext').mockImplementation((context) => {
        if (context === DataContext) {
            return mockDataContext;
        }
        return useContext(context);
    });
    global.alert = jest.fn();

    render(
      <BrowserRouter>
        <DataContext.Provider value={mockDataContext}>
            <Profile />
        </DataContext.Provider>
      </BrowserRouter>
    );

    // Testing goal updates
    const inputCalories = screen.getByPlaceholderText(/2200/i);
    const inputProtein = screen.getByPlaceholderText(/150/i);
    const inputFats = screen.getByPlaceholderText(/75/i);
    const inputCarbs = screen.getByPlaceholderText(/160/i);
    const inputWeight = screen.getByPlaceholderText(/180/i);

    fireEvent.change(inputCalories, { target: { value: 2100 } });
    fireEvent.change(inputProtein, { target: { value: 140 } });
    fireEvent.change(inputFats, { target: { value: 70 } });
    fireEvent.change(inputCarbs, { target: { value: 170 } });
    fireEvent.change(inputWeight, { target: { value: 120 } });

    expect(screen.getByPlaceholderText(2100)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(140)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(70)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(170)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(120)).toBeInTheDocument();


    // Simulating save button click
    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(saveButton).toBeInTheDocument();

    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
    });

    fireEvent.click(saveButton);
});