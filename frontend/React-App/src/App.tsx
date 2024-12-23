import React, {useContext} from 'react';
import { Login } from './pages/Login';
import MoodPage from './pages/MoodPage';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import './App.css';
import EditWeight from './pages/EditWeight';


import MealPage from './pages/MealPage';
import AddMealPage from './pages/AddMeal';
import EditMeal from './pages/EditMeal';


function AppRouter() {
  const { signedIn } = useContext(AuthContext);
  return (
      <BrowserRouter>
        <Routes>
          {!signedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
          {signedIn && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/mood" element={<MoodPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-weight/:email" element={<EditWeight />} />
              <Route path="/meals" element={<MealPage />} />
              <Route path="/add-meal" element={<AddMealPage />} />
              <Route path="/edit-meal/:id" element={<EditMeal />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
  );
}
function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppRouter />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;

