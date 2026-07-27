import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DonorDashboard from './pages/DonorDashboard';
import RequesterDashboard from './pages/RequesterDashboard';
import SearchDonorsPage from './pages/SearchDonorsPage';
import CreateBloodRequestPage from './pages/CreateBloodRequestPage';
import BloodRequestsPage from './pages/BloodRequestsPage';
import DonorProfilePage from './pages/DonorProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import ContactPage from './pages/ContactPage';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route path="/donors" element={<SearchDonorsPage />} />
              <Route path="/requests" element={<BloodRequestsPage />} />
              <Route path="/contact" element={<ContactPage />} />

              <Route path="/create-request" element={
                <ProtectedRoute allowedRoles={['requester', 'donor', 'admin']}>
                  <CreateBloodRequestPage />
                </ProtectedRoute>
              } />

              <Route path="/donor-dashboard" element={
                <ProtectedRoute allowedRoles={['donor']}>
                  <DonorDashboard />
                </ProtectedRoute>
              } />

              <Route path="/requester-dashboard" element={
                <ProtectedRoute allowedRoles={['requester']}>
                  <RequesterDashboard />
                </ProtectedRoute>
              } />

              <Route path="/donor-profile" element={
                <ProtectedRoute>
                  <DonorProfilePage />
                </ProtectedRoute>
              } />

              <Route path="/admin-dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
