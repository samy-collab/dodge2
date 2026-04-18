import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from '../features/auth/authClient';
import { AppShell } from '../components/AppShell';
import { AuthPage } from '../pages/AuthPage';
import { RelapsesPage } from '../pages/RelapsesPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { ProgressPage } from '../pages/ProgressPage';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  return session ? <>{children}</> : <Navigate to="/auth" replace />;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppShell />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/relapses" replace />} />
              <Route path="relapses" element={<RelapsesPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="progress" element={<ProgressPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

