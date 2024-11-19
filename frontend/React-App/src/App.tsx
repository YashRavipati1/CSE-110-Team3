import React, {useContext} from 'react';
import { Login } from './pages/Login';
import MoodPage from './pages/MoodPage';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { DataProvider, DataContext } from './contexts/DataContext';
import WeightTracker from './components/WeightTracker';
import './App.css';


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

