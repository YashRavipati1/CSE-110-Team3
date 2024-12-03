import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import { AuthContext } from "../src/contexts/AuthContext";
import { DataContext } from "../src/contexts/DataContext";
import MealPage from "../src/pages/MealPage";
// Import the Firebase User type
import { User as FirebaseUser } from "firebase/auth";
import { getAllNutritionForUser, getNutritionForUserDateRange } from '../src/api/nutrition'; 
import { MemoryRouter } from 'react-router-dom';

jest.mock("../src/api/nutrition", () => ({
  getAllNutritionForUser: jest.fn(),
}));

describe("Meal Page Tests", () => {
  const mockMeals = [
    { _id: "1", name: "Breakfast Bagel", calories: 300, protein: 20, fats: 10, carbohydrates: 30 },
  ];

  // Create a mock Firebase User
  const mockAuthUser: FirebaseUser = {
    uid: "12345",
    email: "testuser@example.com",
    emailVerified: true,
    isAnonymous: false,
    providerData: [],
    metadata: {
      creationTime: "2023-01-01T00:00:00Z",
      lastSignInTime: "2024-01-01T00:00:00Z",
    },
    refreshToken: "dummy-token",
    displayName: "Test User",
    photoURL: null,
    getIdToken: jest.fn().mockResolvedValue("mock-id-token"),
    getIdTokenResult: jest.fn().mockResolvedValue({
      claims: {},
      token: "mock-token",
      authTime: "2023-01-01T00:00:00Z",
      issuedAtTime: "2023-01-01T00:00:00Z",
      expirationTime: "2024-01-01T00:00:00Z",
      signInProvider: "password",
      signInSecondFactor: null,
    }),
    reload: jest.fn(),
    toJSON: jest.fn(),
    delete: jest.fn().mockResolvedValue(undefined),
    phoneNumber: null,
    providerId: "firebase",
    tenantId: null,
  };
  

  // Application-level mock user
  const mockDataUser = {
    email: "testuser@example.com",
    firstName: "Test",
    lastName: "User",
    age: 30,
    height: 175,
    weight: 70,
    weightGoal: 65,
    caloriesGoal: 2000,
    proteinGoal: 150,
    fatGoal: 50,
    carbGoal: 250,
    nutritionRecords: [],
    exerciseRecords: [],
  };

  jest.mock('../src/api/nutrition', () => ({
    getAllNutritionForUser: jest.fn(),
  })); 

  beforeEach(() => {
    jest.resetAllMocks();
    (getAllNutritionForUser as jest.Mock).mockResolvedValue({
      success: true,
      data: mockMeals,
    });
  });
  

  it("renders a list of meals for the user", async () => {
    render(
      <MemoryRouter> 
        <AuthContext.Provider value={{ currentUser: mockAuthUser, signedIn: true }}>
          <DataContext.Provider value={{ currentUser: mockDataUser, refetchData: jest.fn() }}>
            <MealPage />
          </DataContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Breakfast Bagel")).toBeInTheDocument();
    });
  });
});
