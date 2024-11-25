import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import { Home } from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import { DataContext, DataProvider } from "./contexts/DataContext";

test('Correct Macro Amounts', async () => {
    // Mock current date to same date everytime
    const date = new Date('2024-11-18T00:00:00.000Z');
    jest.useFakeTimers();
    jest.setSystemTime(date);


    // Mock fetch response for nutrient info
    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue(JSON.stringify([
          {
            date: "2024-11-18T00:00:00.000Z",
            calories: 700,
            protein: 80,
            fats: 20,
            carbohydrates: 10,
            user: process.env.TEST_USER || "",
            name: "Breakfast",
          },
        ])),
        json: jest.fn().mockResolvedValue([
          {
            date: "2024-11-18T00:00:00.000Z",
            calories: 700,
            protein: 80,
            fats: 20,
            carbohydrates: 10,
            user: process.env.TEST_USER || "",
            name: "Breakfast",
          },
        ]),
      });

    const mockDataContext = {
        currentUser: {
            email: process.env.TEST_USER || '',
            caloriesGoal: 2200,
            proteinGoal: 150,
            fatGoal: 75,
            carbGoal: 150,
            weightGoal: 0,
            firstName: "Dummy",
            lastName: "Account",
        },
        refetchData: jest.fn(),
    };


    // mocks data context with mock data for user
    jest.spyOn(React, 'useContext').mockImplementation((context) => {
    if (context === DataContext) {
        return mockDataContext;
    }
        return useContext(context);
    });

    render(
      <BrowserRouter>
        <DataProvider>
          <Home />
        </DataProvider>
      </BrowserRouter>
    );


    const calories = await screen.findByText(/Calories - 700/);
    const protein = screen.getByText(/Protein - 80/);
    const fats = screen.getByText(/Fats - 20/);
    const carbohydrates = screen.getByText(/Carbohydrates - 10/);

    expect(calories).toBeInTheDocument();
    expect(protein).toBeInTheDocument();
    expect(fats).toBeInTheDocument();
    expect(carbohydrates).toBeInTheDocument();

    jest.useRealTimers();
});

