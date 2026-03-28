import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WorkflowProvider } from './context/WorkflowContext';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import SubmitWorkflow from './pages/SubmitWorkflow';
import MyRequests from './pages/MyRequests';
import ReviewPanel from './pages/ReviewPanel';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import Notifications from './pages/Notifications';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/signup" element={currentUser ? <Navigate to="/dashboard" /> : <Signup />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/submit" element={
        <ProtectedRoute allowedRoles={['Employee']}>
          <Layout>
            <ErrorBoundary>
              <SubmitWorkflow />
            </ErrorBoundary>
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/my-requests" element={
        <ProtectedRoute allowedRoles={['Employee']}>
          <Layout>
            <ErrorBoundary>
              <MyRequests />
            </ErrorBoundary>
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/review" element={
        <ProtectedRoute allowedRoles={['Reviewer']}>
          <Layout>
            <ErrorBoundary>
              <ReviewPanel />
            </ErrorBoundary>
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <Layout>
            <ErrorBoundary>
              <AdminPanel />
            </ErrorBoundary>
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout>
            <ErrorBoundary>
              <Profile />
            </ErrorBoundary>
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/notifications" element={
        <ProtectedRoute>
          <Layout>
            <ErrorBoundary>
              <Notifications />
            </ErrorBoundary>
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <WorkflowProvider>
          <AppRoutes />
        </WorkflowProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
