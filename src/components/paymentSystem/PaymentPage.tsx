import React, { useEffect, useState, useCallback, useRef } from "react";

interface BillingFormData {
  fullName: string;
  email: string;
  companyName: string;
}
interface BankAccountData {
  accountNumber: string;
  routingNumber: string;
  accountType: "checking" | "savings";
  accountHolderName: string;
  upiId?: string;
}
interface ValidationErrors {
  fullName?: string;
  email?: string;
  accountNumber?: string;
  routingNumber?: string;
  accountHolderName?: string;
  upiId?: string;
  payment?: string;
}
const Payment: React.FC = () => {
 
  const [billingInfo, setBillingInfo] = useState<BillingFormData>({
    fullName: "",
    email: "",
    companyName: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [stripe, setStripe] = useState<any>(null);
  const [elements, setElements] = useState<any>(null);
  const [stripeLoading, setStripeLoading] = useState(true);
  const [cardReady, setCardReady] = useState(false);
  const cardMountRef = useRef<HTMLDivElement | null>(null);
  const cardElementRef = useRef<any>(null);

  const planDetails = {
    name: "Founding Lifetime Member",
    price: 1,
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
      setElements(elementsInstance);
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
      cardEl.on("change", (event: any) => {
        if (event.error) {
          setErrors((prev) => ({ ...prev, payment: event.error.message }));
        } else {
          setErrors((prev) => ({ ...prev, payment: undefined }));
        }
      });
      cardEl.on("ready", () => {
        setCardReady(true);
        setStripeLoading(false);
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
        setStripeLoading(true);
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
            setErrors({ payment: "Failed to load payment system. Please refresh the page." });
            setStripeLoading(false);
          }
        };
        script.onerror = () => {
          setErrors({
            payment: "Failed to load payment system. Please check your internet connection.",
          });
          setStripeLoading(false);
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error("Error initializing Stripe:", error);
        setErrors({ payment: "Payment system initialization failed." });
        setStripeLoading(false);
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
      setErrors({});
      const token = getAuthToken();
      if (!token) {
        setErrors({ payment: "Authentication required. Please log in again." });
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
      setErrors({ payment: msg });
    } finally {
      setIsLoading(false);
    }
  };
 return (
    <div className="lg:pl-8">
      <section className="sticky top-8">
        <h2 className="text-3xl font-bold text-black mb-6">Plan Details</h2>
        <div className="border border-gray-400 rounded-2xl p-8 mb-6">
          <div className="mb-8">
            <h3 className="text-2xl text-black mb-2">{planDetails.name}</h3>
            <div className="mb-8">
              <span className="text-4xl font-bold text-black">
                ${planDetails.price / 100}
              </span>
              <span className="text-sm text-gray-500 ml-2">/ one time payment</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <span className="text-lg font-medium text-gray-600">Total</span>
            <span className="text-2xl font-bold text-black">${planDetails.price / 100}</span>
          </div>
          <button
            onClick={processPayment}
            className="w-full bg-black text-white text-lg font-medium py-4 px-6 rounded-xl hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mt-6"
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
              <a href="#" className="underline hover:text-gray-700">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-gray-700">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"
                fill="currentColor"
              />
            </svg>
            Secure payment powered by industry-leading encryption
          </p>
        </div>
      </section>
    </div>
  );
};
export default Payment;