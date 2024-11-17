import React, {useContext} from 'react';
import { Login } from './pages/Login';
import MoodPage from './pages/MoodPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import './App.css';


import MealPage from './pages/MealPage';

function App() {
  const { signedIn } = useContext(AuthContext);
  return (
    <MealPage />
    /*<BrowserRouter>
      <Routes>
        {!signedIn && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>

      {signedIn && (
        <>
          <Route path="/" element={<MoodPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </BrowserRouter>*/
  );
}

export default App;
