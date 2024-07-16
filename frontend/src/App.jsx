import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import MainNavigation from './components/Navigation/MainNavigation';
import { AuthProvider, AuthContext } from './context/auth-context';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthContext.Consumer>
          {({ token }) => (
            <>
              <MainNavigation />
              <main className="main-content">
                <Routes>
                  {token && <Route path="/" element={<Navigate to="/events" replace />} />}
                  {token && <Route path="/auth" element={<Navigate to="/events" replace />} />}
                  {!token && <Route path="/auth" element={<AuthPage />} />}
                  <Route path="/events" element={<EventsPage />} />
                  {token && <Route path="/bookings" element={<BookingsPage />} />}
                  {!token && <Route path="*" element={<Navigate to="/auth" replace />} />}
                </Routes>
              </main>
            </>
          )}
        </AuthContext.Consumer>
      </Router>
    </AuthProvider>
  );
};

export default App;