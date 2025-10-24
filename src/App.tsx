import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import NotFound from "./components/extras/NotFound";
import Pricing_Plan from "./components/pricing-page/Pricing_Plan";
import Payment from "./components/paymentSystem/PaymentPage";
import Auth from "./components/authok/Auth";
import NavBar from "./components/Navbar/NavBar";
import ProtectedRoute from "./utils/ProtectedRoutes";
import PaymentSuccess from "./components/paymentSystem/PymentSuccess";
import ArticlePage from "./Homepage/ArticlePage";
import PaymentCancelled from "./components/paymentSystem/PaymentCancelled";
import ConfirmationGuest from "./components/paymentSystem/confirmationGuestPage";
import ConfirmationMember from "./components/paymentSystem/confirmationMemberPage";
import Landing from "./Homepage/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import ProofPage from "./components/proofpage/Proof";
import Coming from "./components/extras/Coming";
import BrandAssignment from "./components/assignment/Brandassignment";
import ROIassignment from "./components/assignment/ROIassignment";
import BrandDiagonist from "./components/assignment/BrandDiagnostic";
import OTPVerification from "./components/authok/OtpVerification";
import COI from "./components/coi/COI";
import Setting from "./components/settings/Settings";
import ProfileForm from "./components/settings/ProfileForm";
import ChangeUsernameForm from "./components/settings/ChangeUsernameForm";
import EmailSettings from "./components/settings/EmailSettings";
import { PasswordChangeForm } from "./components/settings/PasswordChangeForm";
import PurchaseHistory from "./components/settings/PaymentHistory";
import UserContextProvider from "./components/settings/Context/UserContextProvider";
import { AboutUs } from "./components/aboutpage/AboutUs";
import AddDetails from "./components/assignment/AddDetails";
import DetailsResult from "./components/resultpage/DetailsResult";

const queryClient = new QueryClient();
const routes = [
  "brand-diagnostic-details",
  "roicalculation",
  "exitwealth",
  "brandassets",
  "groupchat",
  "aiagent",
];
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
                <AddDetails/>
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
          {/* <Route
            path="/chat/*"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          /> */}
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
                <UserContextProvider>
                  <Dashboard />
                </UserContextProvider>
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
          <Route
            path="/setting"
            element={
              <ProtectedRoute>
                <UserContextProvider>
                  <Setting />
                </UserContextProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profileView"
            element={
              <ProtectedRoute>
                <UserContextProvider>
                  <ProfileForm />
                </UserContextProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/usernameView"
            element={
              <ProtectedRoute>
                <UserContextProvider>
                  <ChangeUsernameForm />
                </UserContextProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/emailView"
            element={
              <ProtectedRoute>
                <UserContextProvider>
                  <EmailSettings />
                </UserContextProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/passwordView"
            element={
              <ProtectedRoute>
                <UserContextProvider>
                  <PasswordChangeForm />
                </UserContextProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/historyView"
            element={
              <ProtectedRoute>
                <UserContextProvider>
                  <PurchaseHistory />
                </UserContextProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);
export default App;
