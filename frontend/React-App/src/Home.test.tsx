import React, { useContext } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Home } from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import { signInWithEmail } from "./firebase";

test('Correct Macro Amounts', async () => {

    const date = new Date('2024-11-18T00:00:00.000Z');
    jest.useFakeTimers();
    jest.setSystemTime(date);

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

    const mockAuthContext = {
        currentUser: { email: process.env.TEST_USER || '' },
        signedIn: true,
    };

    jest.spyOn(React, 'useContext').mockImplementation((context) => {
    if (context === AuthContext) {
        return mockAuthContext;
    }
        return useContext(context);
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
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

// test('Logout', async () => {
//     signInWithEmail(process.env.TEST_USER || '', process.env.TEST_PASS || '');

//     render(<BrowserRouter>
//         <AuthProvider>
//             <Home />
//         </AuthProvider>
//     </BrowserRouter>);

//     const logoutButton = screen.getByRole('button', { name: 'Logout' });
//     expect(logoutButton).toBeInTheDocument();
//     fireEvent.click(logoutButton);
    
//     await waitFor(() => expect(window.location.pathname).toBe('/login'));
// });

