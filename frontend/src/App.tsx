import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import PCOSBasics from "./pages/resources/PCOSBasics";
import Symptoms from "./pages/resources/Symptoms";
import Fertility from "./pages/resources/Fertility";
import Nutrition from "./pages/resources/Nutrition";
import Exercise from "./pages/resources/Exercise";
import Stress from "./pages/resources/Stress";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AuthProvider } from "./providers/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Authentication routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/calendar" element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              } />
              <Route path="/resources" element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/resources/pcos-basics" element={
                <ProtectedRoute>
                  <PCOSBasics />
                </ProtectedRoute>
              } />
              <Route path="/resources/symptoms" element={
                <ProtectedRoute>
                  <Symptoms />
                </ProtectedRoute>
              } />
              <Route path="/resources/fertility" element={
                <ProtectedRoute>
                  <Fertility />
                </ProtectedRoute>
              } />
              <Route path="/resources/nutrition" element={
                <ProtectedRoute>
                  <Nutrition />
                </ProtectedRoute>
              } />
              <Route path="/resources/exercise" element={
                <ProtectedRoute>
                  <Exercise />
                </ProtectedRoute>
              } />
              <Route path="/resources/stress" element={
                <ProtectedRoute>
                  <Stress />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
