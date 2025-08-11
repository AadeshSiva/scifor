import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import OTPVerification from "./pages/OtpVerification";
import Chat from "./pages/Chat";
import HomePage from "./pages/HomePage";
import COI from "./pages/COI";
import JoinPage from "./pages/JoinPage";
import Payment from "./pages/PaymentPage";
import Auth from "./pages/Auth";
import NavBar from "./components/layout/NavBar";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoutes";
import PaymentSuccess from "./pages/PymentSuccess";
import Index from "./components/join/meeting";
import ArticlePage from "./pages/ArticlePage";
import PaymentCancelled from "./pages/PaymentCancelled";
import ConfirmationGuest from "./pages/confirmationGuestPage";
import Landing from "./pages/Landing";
import Pricing_Plan from './pages/Pricing_Plan'

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/landing" element={<HomePage />} />
            <Route path="/otpverify" element={<ProtectedRoute><OTPVerification /></ProtectedRoute>} />
            <Route path="/auth" element={<ProtectedRoute requireAuth={false}><Auth /></ProtectedRoute>} />
            <Route path="*" element={<ProtectedRoute requireAuth={false}><NotFound /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute requireAuth={false}><Landing /></ProtectedRoute>} />
            <Route path="/coi" element={<ProtectedRoute requireAuth={false}><COI /></ProtectedRoute>} />
            <Route path="/join" element={<ProtectedRoute requireAuth={false}><JoinPage /></ProtectedRoute>} />
            <Route path="/meeting" element={<ProtectedRoute requireAuth={false}><Index /></ProtectedRoute>} />
            <Route path="/article" element={<ProtectedRoute requireAuth={false}><ArticlePage /></ProtectedRoute>} />
            <Route path="/pricing-page" element={<ProtectedRoute requireAuth={false}><Pricing_Plan /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
            <Route path="/payment-cancelled" element={<ProtectedRoute><PaymentCancelled /></ProtectedRoute>} />
            <Route path="/successfullyregistered" element={<ConfirmationGuest />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
