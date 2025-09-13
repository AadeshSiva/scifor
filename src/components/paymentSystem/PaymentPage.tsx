import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/utils/AuthContext";

interface BillingFormData {
  fullName: string;
  email: string;
  companyName: string;
}

const Payment: React.FC = () => {
  const { user } = useAuth();
  const [billingInfo] = useState<BillingFormData>({
    fullName: user.full_name,
    email: user.email,
    companyName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [stripe, setStripe] = useState<any>(null);
  const cardMountRef = useRef<HTMLDivElement | null>(null);
  const cardElementRef = useRef<any>(null);
  const planDetails = {
    name: "Founding Lifetime Member",
    price: 179700,
    description: "Seats available for 50 members",
  };

  useEffect(() => {
    let cancelled = false;
    const setupStripeElements = async (stripeInstance: any) => {
      if (cancelled) return;
      setStripe(stripeInstance);
      const elementsInstance = stripeInstance.elements({
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#000000",
            colorBackground: "#ffffff",
            colorText: "#4b5563",
            colorDanger: "#ef4444",
            fontFamily: "system-ui, -apple-system, sans-serif",
            spacingUnit: "6px",
            borderRadius: "12px",
          },
        },
      });
      if (cancelled) return;
      const cardEl = elementsInstance.create("card", {
        style: {
          base: {
            fontSize: "18px",
            color: "#4b5563",
            "::placeholder": { color: "#9ca3af" },
            padding: "24px",
          },
          invalid: { color: "#ef4444", iconColor: "#ef4444" },
        },
        hidePostalCode: true,
      });
      cardElementRef.current = cardEl;
      const mountCard = () => {
        if (cancelled) return;
        if (cardMountRef.current) {
          try {
            cardEl.mount(cardMountRef.current);
          } catch (err) {
            console.error("Mount error:", err);
          }
        } else {
          requestAnimationFrame(mountCard);
        }
      };
      mountCard();
    };
    const initializeStripe = async () => {
      try {
        if ((window as any).Stripe) {
          const s = (window as any).Stripe(
            "pk_live_51RPvxVGq7lR7zc6NAc818PzlCvPUUm7GN01P5GyrWE0gdtopHrbOk68uyBiCyXBwuQZtdID4MfUTuQQqD3F9Hcoc00ZEoUsoVL"
          );
          await setupStripeElements(s);
          return;
        }
        const script = document.createElement("script");
        script.src = "https://js.stripe.com/v3/";
        script.async = true;
        script.onload = async () => {
          try {
            const s = (window as any).Stripe(
              "pk_live_51RPvxVGq7lR7zc6NAc818PzlCvPUUm7GN01P5GyrWE0gdtopHrbOk68uyBiCyXBwuQZtdID4MfUTuQQqD3F9Hcoc00ZEoUsoVL"
            );
            await setupStripeElements(s);
          } catch (error) {
            console.error("Failed to initialize Stripe:", error);
          }
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error("Error initializing Stripe:", error);
      }
    };
    initializeStripe();
    return () => {
      cancelled = true;
      try {
        cardElementRef.current?.unmount();
      } catch { }
    };
  }, []);
  const getAuthToken = (): string | null => localStorage.getItem("access_token") || sessionStorage.getItem("access_token") || null;
  const processPayment = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        return;
      }
      setIsLoading(true);
      const requestData = {
        amount: planDetails.price,
        product_name: planDetails.name,
        billing_info: {
          fullName: billingInfo.fullName,
          email: billingInfo.email,
          companyName: billingInfo.companyName,
        },
      };
      const response = await fetch("https://api.prspera.com/create-checkout-session/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || `Server error: ${response.status}`);
      }
      if (data.url) {
        window.location.href = data.url;
      } else if (data.sessionId) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
        if (error) throw new Error(error.message);
      } else {
        throw new Error("No checkout URL or session ID received from server");
      }
    } catch (err) {
      console.error("Payment processing error:", err);
      const msg = err instanceof Error ? err.message : "An unexpected error occurred";
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Payment Summary Section */}
          <div className="w-full lg:w-2/5">
            <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 sticky top-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Plan Details</h2>
              <div className="mb-8">
                <h3 className="text-2xl text-gray-900 mb-2">{planDetails.name}</h3>
                <p className="text-gray-600 mb-4">{planDetails.description}</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-gray-900">
                    ${planDetails.price / 100}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">/ one time payment</span>
                </div>
                {/* Features List */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-blue-800 mb-2">This plan includes:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Lifetime access</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">All premium features</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Priority support</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Exclusive content</span>
                    </li>
                  </ul>
                </div>
              </div>           
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <span className="text-lg font-medium text-gray-600">Total</span>
                <span className="text-2xl font-bold text-gray-900">${planDetails.price / 100}</span>
              </div>
              <button
                onClick={processPayment}
                disabled={isLoading}
                className="w-full bg-gray-900 text-white text-lg font-medium py-4 px-6 rounded-xl hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 mt-6 flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Pay $${planDetails.price / 100}`
                )}
              </button>
              <div className="text-center text-sm text-gray-500 mt-4">
                <p>By completing this purchase, you agree to our</p>
                <p>
                  <a href="#" className="underline hover:text-gray-700 transition-colors">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline hover:text-gray-700 transition-colors">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </section>
            <div className="text-center text-sm text-gray-500 mt-6">
              <p className="flex items-center justify-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-green-500 flex-shrink-0"
                >
                  <path
                    d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"
                    fill="currentColor"
                  />
                </svg>
                Secure payment powered by industry-leading encryption
              </p>
            </div>
          </div>
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user.full_name}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                  />
                </div> 
                <div>
                  <p className="text-xs text-gray-500 mt-2">Your payment details are encrypted and processed securely</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6 mt-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">What happens next?</h3>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Immediate access to all features after payment</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Lifetime membership with no recurring fees</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Downloadable invoice for your records</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;