import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import EntitiesPage from './pages/EntitiesPage';
import EntityDetailPage from './pages/EntityDetailPage';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Маршрут для логина */}
        <Route path="/login" element={<LoginPage />} />

        {/* Защищенные маршруты */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <EntitiesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/entities"
          element={
            <ProtectedRoute>
              <EntitiesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/entities/:id"
          element={
            <ProtectedRoute>
              <EntityDetailPage />
            </ProtectedRoute>
          }
        />

        {/* Переадресация на логин при неизвестных URL */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
