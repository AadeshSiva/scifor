import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import NotFound from "./components/extras/NotFound";
import Pricing_Plan from "./pages/Pricing_Plan";
import Payment from "./components/paymentSystem/PaymentPage";
import Auth from "./components/authok/Auth";
import NavBar from "./components/layout/NavBar";
import ProtectedRoute from "./utils/ProtectedRoutes";
import PaymentSuccess from "./components/paymentSystem/PymentSuccess";
import Index from "./components/join/meeting";
import ArticlePage from "./pages/ArticlePage";
import PaymentCancelled from "./components/paymentSystem/PaymentCancelled";
import ConfirmationGuest from "./components/paymentSystem/confirmationGuestPage";
import ConfirmationMember from "./components/paymentSystem/confirmationMemberPage";
import Landing from "./pages/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import AboutUs from "./pages/AboutUs";
import ProofPage from "./pages/Proof";
import AddDetails from "./components/paymentSystem/AddDetails";
import Coming from "./components/extras/Coming";
import BrandAssignment from "./components/assignment/Brandassignment";
import ROIassignment from "./components/assignment/ROIassignment";
import BrandDiagonist from "./components/assignment/BrandDiagnostic";
import OTPVerification from "./components/authok/OtpVerification";
import Chat from "./components/chat/Chat";
import COI from "./components/coi/COI";

const queryClient = new QueryClient();
const routes = ["brand-diagnostic-details", "roicalculation", "exitwealth", "brandassets", "groupchat", "aiagent", "setting"]
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="fixed top-0 left-0 w-full z-50">
            <NavBar />
          </div>
          <Routes>
            {routes.map((item, index) => (
              <Route
                key={index}
                path={`/${item}/*`}
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Coming />
                  </ProtectedRoute>
                }
              />
            ))}
            <Route
              path="/brandassignment"
              element={
                <ProtectedRoute>
                  <BrandAssignment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roiassignment"
              element={
                <ProtectedRoute>
                  <ROIassignment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/brand-diagnostic"
              element={
                <ProtectedRoute>
                  <BrandDiagonist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/businessdetails/*"
              element={
                <ProtectedRoute requireAuth={false}>
                  <AddDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/otpverify/*"
              element={
                <ProtectedRoute>
                  <OTPVerification />
                </ProtectedRoute>
              }
            />
            <Route
              path="/auth/*"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Auth />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoute requireAuth={false}>
                  <NotFound />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat/*"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Landing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coi/*"
              element={
                <ProtectedRoute requireAuth={false}>
                  <COI />
                </ProtectedRoute>
              }
            />
            <Route
              path="/proof/*"
              element={
                <ProtectedRoute requireAuth={false}>
                  <ProofPage />
                </ProtectedRoute>
              }
            />{" "}
            <Route
              path="/pricing-plan/*"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Pricing_Plan />
                </ProtectedRoute>
              }
            />
            <Route
              path="/meeting/*"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about-us/*"
              element={
                <ProtectedRoute requireAuth={false}>
                  <AboutUs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/article/*"
              element={
                <ProtectedRoute requireAuth={false}>
                  <ArticlePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment/*"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment-success/*"
              element={
                <ProtectedRoute>
                  <PaymentSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment-cancelled/*"
              element={
                <ProtectedRoute>
                  <PaymentCancelled />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirmation-guest/*"
              element={
                <ProtectedRoute>
                  <ConfirmationGuest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirmation-member/*"
              element={
                <ProtectedRoute>
                  <ConfirmationMember />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);
export default App;
