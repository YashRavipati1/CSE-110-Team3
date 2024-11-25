import React, {useContext} from 'react';
import { Login } from './pages/Login';
import MoodPage from './pages/MoodPage';
import { Home } from './pages/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import './App.css';


import MealPage from './pages/MealPage';
import AddMealPage from './pages/AddMeal';
import EditMeal from './pages/EditMeal';

function App() {
  const { signedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        {!signedIn && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/meals" element={<MealPage />} />
            <Route path="/add-meal" element={<AddMealPage />} />
            <Route path="/edit-meal/:id" element={<EditMeal />} />
          </>
        )}
      </Routes>

      {signedIn && (
        <>
          <Route path="/" element={<MoodPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;

  