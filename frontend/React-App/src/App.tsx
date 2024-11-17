import React, {useContext} from 'react';
import { Login } from './pages/Login';
import MoodPage from './pages/MoodPage';
import { Home } from './pages/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import './App.css';


import MealPage from './pages/MealPage';

function AppRouter() {
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
    </BrowserRouter>
  );
}
function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;*/
  )};