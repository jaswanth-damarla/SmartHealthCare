import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { AppProvider } from '@/context/AppContext';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import HomePage from '@/pages/HomePage';
import SymptomChecker from '@/pages/SymptomChecker';
import DoctorDirectory from '@/pages/DoctorDirectory';
import BookingConfirmation from '@/pages/BookingConfirmation';
import PatientDashboard from '@/pages/PatientDashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ThemeToggle from '@/components/ThemeToggle';
import ScrollToTop from '@/components/ScrollToTop'; // Import the new fix

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          {/* This component listens for route changes and snaps 
              the window back to the top automatically.
          */}
          <ScrollToTop /> 

          <div className="transition-colors duration-500">
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/symptom-checker" element={<SymptomChecker />} />
                <Route path="/doctors" element={<DoctorDirectory />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/booking/:doctorId"
                  element={
                    <ProtectedRoute>
                      <BookingConfirmation />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <PatientDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Layout>
            
            {/* UI Utilities */}
            <ThemeToggle /> 
            <Toaster />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;