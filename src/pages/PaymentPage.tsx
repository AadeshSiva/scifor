// import React, { useEffect, useState, useCallback, useRef } from "react";
// import PaymentSuccess from "./PymentSuccess";

// interface BillingFormData {
//   fullName: string;
//   email: string;
//   companyName: string;
// }

// interface BankAccountData {
//   accountNumber: string;
//   routingNumber: string;
//   accountType: "checking" | "savings";
//   accountHolderName: string;
//   upiId?: string; // optional, used for UPI input
// }

// interface ValidationErrors {
//   fullName?: string;
//   email?: string;
//   accountNumber?: string;
//   routingNumber?: string;
//   accountHolderName?: string;
//   upiId?: string;
//   payment?: string;
// }

// const Payment: React.FC = () => {
//   const [selectedMethod, setSelectedMethod] = useState<"credit" | "bank" | "upi" | "others">(
//     "credit"
//   );
//   const [searchQuery, setSearchQuery] = useState("");
//   const [billingInfo, setBillingInfo] = useState<BillingFormData>({
//     fullName: "",
//     email: "",
//     companyName: "",
//   });
//   const [bankInfo, setBankInfo] = useState<BankAccountData>({
//     accountNumber: "",
//     routingNumber: "",
//     accountType: "checking",
//     accountHolderName: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState<ValidationErrors>({});
//   const [success, setSuccess] = useState(false);

//   // Stripe
//   const [stripe, setStripe] = useState<any>(null);
//   const [elements, setElements] = useState<any>(null);
//   const [stripeLoading, setStripeLoading] = useState(true);
//   const [cardReady, setCardReady] = useState(false);
//   const cardMountRef = useRef<HTMLDivElement | null>(null);
//   const cardElementRef = useRef<any>(null);

//   const features = [
//     "50 bids per month",
//     "50 skills learning",
//     "Custom cover photo",
//     "Unlimited revisions",
//     "Unlock rewards",
//   ];

//   const planDetails = {
//     name: "Founding Lifetime Member",
//     price: 100,
//     description: "Seats available for 50 members",
//   };

//   // Initialize Stripe and create Elements + Card element
//   useEffect(() => {
//     let cancelled = false;

//     const setupStripeElements = async (stripeInstance: any) => {
//       if (cancelled) return;
//       setStripe(stripeInstance);

//       const elementsInstance = stripeInstance.elements({
//         appearance: {
//           theme: "stripe",
//           variables: {
//             colorPrimary: "#000000",
//             colorBackground: "#ffffff",
//             colorText: "#4b5563",
//             colorDanger: "#ef4444",
//             fontFamily: "system-ui, -apple-system, sans-serif",
//             spacingUnit: "6px",
//             borderRadius: "12px",
//           },
//         },
//       });
//       if (cancelled) return;
//       setElements(elementsInstance);

//       const cardEl = elementsInstance.create("card", {
//         style: {
//           base: {
//             fontSize: "18px",
//             color: "#4b5563",
//             "::placeholder": { color: "#9ca3af" },
//             padding: "24px",
//           },
//           invalid: { color: "#ef4444", iconColor: "#ef4444" },
//         },
//         hidePostalCode: true,
//       });

//       cardEl.on("change", (event: any) => {
//         if (event.error) {
//           setErrors((prev) => ({ ...prev, payment: event.error.message }));
//         } else {
//           setErrors((prev) => ({ ...prev, payment: undefined }));
//         }
//       });

//       cardEl.on("ready", () => {
//         setCardReady(true);
//         setStripeLoading(false);
//       });

//       cardElementRef.current = cardEl;

//       // Mount once container is available
//       const mountCard = () => {
//         if (cancelled) return;
//         if (cardMountRef.current) {
//           try {
//             cardEl.mount(cardMountRef.current);
//           } catch (err) {
//             console.error("Mount error:", err);
//           }
//         } else {
//           // Try again next frame
//           requestAnimationFrame(mountCard);
//         }
//       };
//       mountCard();
//     };

//     const initializeStripe = async () => {
//       try {
//         setStripeLoading(true);
//         // If Stripe already on window
//         if ((window as any).Stripe) {
//           const s = (window as any).Stripe(
//             "pk_test_51RPvxVGq7lR7zc6NwAd6VKBnrteOef9QOGEBwAdhmOYCdkB84JZ1C6X3MpddKym6jtVGGBvRlKS9dWV7tG2UtAYS00dZUM68Xv"
//           );
//           await setupStripeElements(s);
//           return;
//         }
//         // Load script
//         const script = document.createElement("script");
//         script.src = "https://js.stripe.com/v3/";
//         script.async = true;
//         script.onload = async () => {
//           try {
//             const s = (window as any).Stripe(
//               "pk_test_51RPvxVGq7lR7zc6NwAd6VKBnrteOef9QOGEBwAdhmOYCdkB84JZ1C6X3MpddKym6jtVGGBvRlKS9dWV7tG2UtAYS00dZUM68Xv"
//             );
//             await setupStripeElements(s);
//           } catch (error) {
//             console.error("Failed to initialize Stripe:", error);
//             setErrors({ payment: "Failed to load payment system. Please refresh the page." });
//             setStripeLoading(false);
//           }
//         };
//         script.onerror = () => {
//           setErrors({
//             payment: "Failed to load payment system. Please check your internet connection.",
//           });
//           setStripeLoading(false);
//         };
//         document.head.appendChild(script);
//       } catch (error) {
//         console.error("Error initializing Stripe:", error);
//         setErrors({ payment: "Payment system initialization failed." });
//         setStripeLoading(false);
//       }
//     };

//     initializeStripe();

//     return () => {
//       cancelled = true;
//       try {
//         cardElementRef.current?.unmount();
//       } catch {}
//     };
//   }, []);

//   // Validation
//   const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const validateRoutingNumber = (routing: string): boolean => {
//     if (!/^\d{9}$/.test(routing)) return false;
//     const d = routing.split("").map(Number);
//     const checksum =
//       (3 * (d[0] + d[3] + d[6]) + 7 * (d[1] + d[4] + d[7]) + (d[2] + d[5] + d[8])) % 10;
//     return checksum === 0;
//   };

//   const validateBillingInfo = (): boolean => {
//     const newErrors: ValidationErrors = {};
//     let ok = true;
//     if (!billingInfo.fullName.trim()) {
//       newErrors.fullName = "Full name is required";
//       ok = false;
//     }
//     if (!billingInfo.email.trim()) {
//       newErrors.email = "Email is required";
//       ok = false;
//     } else if (!validateEmail(billingInfo.email)) {
//       newErrors.email = "Please enter a valid email address";
//       ok = false;
//     }
//     setErrors((prev) => ({ ...prev, ...newErrors }));
//     return ok;
//   };

//   const validateBankAccount = (): boolean => {
//     const newErrors: ValidationErrors = {};
//     let ok = true;

//     if (!bankInfo.accountHolderName.trim()) {
//       newErrors.accountHolderName =
//         "Account holder name is required and must match your bank records";
//       ok = false;
//     }
//     if (!bankInfo.accountNumber.trim()) {
//       newErrors.accountNumber = "Account number is required";
//       ok = false;
//     } else if (bankInfo.accountNumber.length < 8 || bankInfo.accountNumber.length > 17) {
//       newErrors.accountNumber = "Account number must be between 8-17 digits";
//       ok = false;
//     } else if (!/^\d+$/.test(bankInfo.accountNumber)) {
//       newErrors.accountNumber = "Account number must contain only digits";
//       ok = false;
//     }
//     if (!bankInfo.routingNumber.trim()) {
//       newErrors.routingNumber = "Routing number is required";
//       ok = false;
//     } else if (!validateRoutingNumber(bankInfo.routingNumber)) {
//       newErrors.routingNumber = "Please enter a valid 9-digit US routing number";
//       ok = false;
//     }
//     setErrors((prev) => ({ ...prev, ...newErrors }));
//     return ok;
//   };

//   const validateUpiPayment = (): boolean => {
//     const newErrors: ValidationErrors = {};
//     let ok = true;
//     if (!bankInfo.upiId?.trim()) {
//       newErrors.upiId = "UPI ID is required";
//       ok = false;
//     } else {
//       const upiRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+$/;
//       if (!upiRegex.test(bankInfo.upiId)) {
//         newErrors.upiId = "Please enter a valid UPI ID (e.g., user@paytm)";
//         ok = false;
//       }
//     }
//     setErrors((prev) => ({ ...prev, ...newErrors }));
//     return ok;
//   };

//   const handleBillingChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = e.target;
//       setBillingInfo((prev) => ({ ...prev, [name]: value }));
//       if (errors[name as keyof ValidationErrors]) {
//         setErrors((prev) => ({ ...prev, [name]: undefined }));
//       }
//     },
//     [errors]
//   );

//   const handleBankChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//       const { name, value } = e.target;
//       setBankInfo((prev) => ({ ...prev, [name]: value as any }));
//       if (errors[name as keyof ValidationErrors]) {
//         setErrors((prev) => ({ ...prev, [name]: undefined }));
//       }
//     },
//     [errors]
//   );

//   const getAuthToken = (): string | null =>
//     localStorage.getItem("access_token") || sessionStorage.getItem("access_token") || null;

//   const processPayment = async () => {
//     try {
//       setErrors({});

//       if (!validateBillingInfo()) return;

//       // Handle unavailable methods early
//       if (selectedMethod === "upi" || selectedMethod === "others") {
//         if (selectedMethod === "upi" && !validateUpiPayment()) return;
//         setErrors({
//           payment: "This payment method is not supported yet. Please use Credit Card or Bank.",
//         });
//         return;
//       }

//       if (selectedMethod === "bank" && !validateBankAccount()) return;

//       if (selectedMethod === "credit") {
//         if (stripeLoading || !stripe || !elements) {
//           setErrors({ payment: "Payment system is still loading. Please wait a moment." });
//           return;
//         }
//       }

//       const token = getAuthToken();
//       if (!token) {
//         setErrors({ payment: "Authentication required. Please log in again." });
//         return;
//       }

//       setIsLoading(true);

//       let paymentMethodData: any = {};

//       if (selectedMethod === "credit") {
//         const card = elements.getElement("card");
//         if (!card) {
//           setErrors({ payment: "Card input not ready. Please refresh and try again." });
//           setIsLoading(false);
//           return;
//         }

//         const { paymentMethod, error } = await stripe.createPaymentMethod({
//           type: "card",
//           card,
//           billing_details: {
//             name: billingInfo.fullName,
//             email: billingInfo.email,
//           },
//         });
//         if (error) throw new Error(error.message);

//         paymentMethodData = {
//           payment_method_id: paymentMethod.id,
//           type: "card",
//         };
//       } else if (selectedMethod === "bank") {
//         paymentMethodData = {
//           type: "us_bank_account",
//           us_bank_account: {
//             account_number: bankInfo.accountNumber,
//             routing_number: bankInfo.routingNumber,
//             account_type: bankInfo.accountType,
//             account_holder_type: "individual",
//           },
//           billing_details: {
//             name: bankInfo.accountHolderName,
//             email: billingInfo.email,
//           },
//         };
//       }

//       const response = await fetch("http://31.97.117.28:8001/create-checkout-session/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           amount: planDetails.price, // if backend expects cents, send price*100
//           product_name: planDetails.name,
//           billing_info: billingInfo,
//         }),
//       });

//       // payment_method_data: paymentMethodData,
//       // currency: "usd",

//       console.log({
//         amount: planDetails.price,
//         product_name: planDetails.name,
//         billing_info: billingInfo,
//       });

//       // log everything
//       console.log("Raw backend response:", response);

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error || `Server error: ${response.status}`);
//       }

//       if (data.requires_action && data.client_secret) {
//         const { error: confirmError } = await stripe.confirmCardPayment(data.client_secret);
//         if (confirmError) throw new Error(confirmError.message);
//         setSuccess(true);
//       } else if (data.status === "succeeded") {
//         setSuccess(true);
//       } else {
//         throw new Error(data.error || "Payment processing failed");
//       }
//     } catch (err) {
//       console.error("Payment processing error:", err);
//       const msg = err instanceof Error ? err.message : "An unexpected error occurred";
//       setErrors({ payment: msg });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const PaymentMethodButton: React.FC<{
//     icon?: string;
//     label: string;
//     selected?: boolean;
//     onClick: () => void;
//   }> = ({ icon, label, selected, onClick }) => (
//     <button
//       onClick={onClick}
//       className={`flex items-center justify-center gap-2 border text-gray-600 cursor-pointer px-8 py-3 rounded-xl border-solid transition-colors ${
//         selected ? "border-black bg-gray-50" : "border-gray-400 hover:border-gray-600"
//       } flex-1 min-w-0`}
//     >
//       {icon && <div dangerouslySetInnerHTML={{ __html: icon }} />}
//       <span className="whitespace-nowrap">{label}</span>
//     </button>
//   );

//   const CheckIcon = () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="flex-shrink-0"
//     >
//       <path
//         d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"
//         fill="black"
//       />
//     </svg>
//   );

//   const PlanFeature: React.FC<{ text: string }> = ({ text }) => (
//     <div className="flex items-center gap-3 text-base text-gray-600">
//       <CheckIcon />
//       <span>{text}</span>
//     </div>
//   );

//   const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
//     if (!message) return null;
//     return <p className="text-red-600 text-sm mt-1">{message}</p>;
//   };

//   const creditCardIcon = `<svg width="20" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.00423 2.5H18.0042C18.4645 2.5 18.8376 2.87309 18.8376 3.33333V16.6667C18.8376 17.1269 18.4645 17.5 18.0042 17.5H3.00423C2.544 17.5 2.1709 17.1269 2.1709 16.6667V3.33333C2.1709 2.87309 2.544 2.5 3.00423 2.5ZM17.1709 9.16667H3.83757V15.8333H17.1709V9.16667ZM17.1709 7.5V4.16667H3.83757V7.5H17.1709ZM12.1709 12.5H15.5042V14.1667H12.1709V12.5Z" fill="currentColor"></path></svg>`;
//   const bankIcon = `<svg width="20" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.16699 16.6665H18.8337V18.3332H2.16699V16.6665ZM3.83366 9.99984H5.50033V15.8332H3.83366V9.99984ZM8.00033 9.99984H9.66699V15.8332H8.00033V9.99984ZM11.3337 9.99984H13.0003V15.8332H11.3337V9.99984ZM15.5003 9.99984H17.167V15.8332H15.5003V9.99984ZM2.16699 5.83317L10.5003 1.6665L18.8337 5.83317V9.1665H2.16699V5.83317ZM3.83366 6.86323V7.49984H17.167V6.86323L10.5003 3.5299L3.83366 6.86323ZM10.5003 6.6665C10.0401 6.6665 9.66699 6.2934 9.66699 5.83317C9.66699 5.37294 10.0401 4.99984 10.5003 4.99984C10.9606 4.99984 11.3337 5.37294 11.3337 5.83317C11.3337 6.2934 10.9606 6.6665 10.5003 6.6665Z" fill="currentColor"></path></svg>`;
//   const dropdownIcon = `<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13.3335L5 8.3335H15L10 13.3335Z" fill="currentColor"></path></svg>`;
//   const upiIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/></svg>`;

//   if (success) {
//     return <PaymentSuccess />;
//   }

//   return (
//     <div className="min-h-screen">
//       <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 text-[16px]">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
//           {/* Left */}
//           <div className="space-y-12">
//             {errors.payment && (
//               <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
//                 <p>{errors.payment}</p>
//               </div>
//             )}

//             {stripeLoading && selectedMethod === "credit" && (
//               <div className="p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded">
//                 <p>Loading payment system...</p>
//               </div>
//             )}

//             {/* Billing */}
//             <section>
//               <h2 className="text-3xl font-semibold text-black mb-2">Billing Information</h2>
//               <p className="text-base font-light text-gray-600 mb-8 mt-6">
//                 Used for invoices and billing communication
//               </p>
//               <div className="space-y-6">
//                 <div>
//                   <input
//                     type="text"
//                     name="fullName"
//                     placeholder="Enter full name"
//                     value={billingInfo.fullName}
//                     onChange={handleBillingChange}
//                     className={`w-full h-16 px-6 text-lg text-gray-600 border rounded-xl focus:outline-none transition-colors ${
//                       errors.fullName
//                         ? "border-red-500 focus:border-red-500"
//                         : "border-gray-400 focus:border-black"
//                     }`}
//                   />
//                   <ErrorMessage message={errors.fullName} />
//                 </div>
//                 <div>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Enter billing email"
//                     value={billingInfo.email}
//                     onChange={handleBillingChange}
//                     className={`w-full h-16 px-6 text-lg text-gray-600 border rounded-xl focus:outline-none transition-colors ${
//                       errors.email
//                         ? "border-red-500 focus:border-red-500"
//                         : "border-gray-400 focus:border-black"
//                     }`}
//                   />
//                   <ErrorMessage message={errors.email} />
//                 </div>
//                 <input
//                   type="text"
//                   name="companyName"
//                   placeholder="Enter company name (optional)"
//                   value={billingInfo.companyName}
//                   onChange={handleBillingChange}
//                   className="w-full h-16 px-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors"
//                 />
//               </div>
//             </section>

//             {/* Payment Methods */}
//             <section>
//               <h2 className="text-3xl font-bold text-black mb-6">Pay with</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
//                 <PaymentMethodButton
//                   icon={creditCardIcon}
//                   label="Card"
//                   selected={selectedMethod === "credit"}
//                   onClick={() => setSelectedMethod("credit")}
//                 />

//                 {/* These are not needed for now */}
//                 {/* <PaymentMethodButton
//                   icon={bankIcon}
//                   label="Bank Account"
//                   selected={selectedMethod === 'bank'}
//                   onClick={() => setSelectedMethod('bank')}
//                 />
//                 <PaymentMethodButton
//                   icon={upiIcon}
//                   label="UPI"
//                   selected={selectedMethod === 'upi'}
//                   onClick={() => setSelectedMethod('upi')}
//                 />
//                 <PaymentMethodButton
//                   label="Others"
//                   icon={dropdownIcon}
//                   selected={selectedMethod === 'others'}
//                   onClick={() => setSelectedMethod('others')}
//                 /> */}
//               </div>

//               {/* Credit card form (kept mounted, hidden when not selected) */}
//               <div className={`space-y-6 ${selectedMethod === "credit" ? "" : "hidden"}`}>
//                 <div
//                   className={`border rounded-xl p-6 transition-colors ${
//                     stripeLoading
//                       ? "border-gray-300 bg-gray-50"
//                       : "border-gray-400 focus-within:border-black"
//                   }`}
//                 >
//                   <div ref={cardMountRef} />
//                   {stripeLoading && (
//                     <div className="flex items-center justify-center h-[60px] text-gray-500">
//                       Loading card form...
//                     </div>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-500 flex items-center gap-2">
//                   <svg
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"
//                       fill="currentColor"
//                     />
//                   </svg>
//                   Your card details are secure and encrypted by Stripe
//                 </p>
//               </div>

//               {/* Bank account form */}
//               {selectedMethod === "bank" && (
//                 <div className="space-y-6">
//                   <div className="p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded">
//                     <p className="text-sm font-medium mb-1">ACH Bank Transfer Notice</p>
//                     <p className="text-xs">
//                       Bank account payments may take 3-5 business days to process and will require
//                       micro-deposit verification.
//                     </p>
//                   </div>

//                   <div>
//                     <input
//                       type="text"
//                       name="accountHolderName"
//                       placeholder="Account holder name (must match bank records)"
//                       value={bankInfo.accountHolderName}
//                       onChange={handleBankChange}
//                       className={`w-full h-16 px-6 text-lg text-gray-600 border rounded-xl focus:outline-none transition-colors ${
//                         errors.accountHolderName
//                           ? "border-red-500 focus:border-red-500"
//                           : "border-gray-400 focus:border-black"
//                       }`}
//                     />
//                     <ErrorMessage message={errors.accountHolderName} />
//                   </div>

//                   <div>
//                     <input
//                       type="text"
//                       name="routingNumber"
//                       placeholder="9-digit routing number (e.g., 021000021)"
//                       value={bankInfo.routingNumber}
//                       onChange={handleBankChange}
//                       maxLength={9}
//                       pattern="[0-9]{9}"
//                       className={`w-full h-16 px-6 text-lg text-gray-600 border rounded-xl focus:outline-none transition-colors ${
//                         errors.routingNumber
//                           ? "border-red-500 focus:border-red-500"
//                           : "border-gray-400 focus:border-black"
//                       }`}
//                     />
//                     <ErrorMessage message={errors.routingNumber} />
//                     <p className="text-xs text-gray-500 mt-1">
//                       Find this on your check or bank statement
//                     </p>
//                   </div>

//                   <div>
//                     <input
//                       type="text"
//                       name="accountNumber"
//                       placeholder="Account number (8-17 digits)"
//                       value={bankInfo.accountNumber}
//                       onChange={handleBankChange}
//                       minLength={8}
//                       maxLength={17}
//                       className={`w-full h-16 px-6 text-lg text-gray-600 border rounded-xl focus:outline-none transition-colors ${
//                         errors.accountNumber
//                           ? "border-red-500 focus:border-red-500"
//                           : "border-gray-400 focus:border-black"
//                       }`}
//                     />
//                     <ErrorMessage message={errors.accountNumber} />
//                   </div>

//                   <div>
//                     <select
//                       name="accountType"
//                       value={bankInfo.accountType}
//                       onChange={handleBankChange}
//                       className="w-full h-16 px-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors bg-white"
//                     >
//                       <option value="checking">Checking Account</option>
//                       <option value="savings">Savings Account</option>
//                     </select>
//                   </div>

//                   <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
//                     <div className="flex">
//                       <div className="flex-shrink-0">
//                         <svg
//                           className="h-5 w-5 text-yellow-400"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </div>
//                       <div className="ml-3">
//                         <p className="text-sm text-yellow-700">
//                           <strong>Important:</strong> By providing your bank account details, you
//                           authorize us to debit your account for this payment and agree to the ACH
//                           authorization terms.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* UPI */}
//               {selectedMethod === "upi" && (
//                 <div className="space-y-6">
//                   <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
//                     <p className="text-sm font-medium mb-1">UPI Payment</p>
//                     <p className="text-xs">
//                       Instant payment via UPI. You'll be redirected to complete the payment.
//                     </p>
//                   </div>

//                   <div>
//                     <input
//                       type="text"
//                       name="upiId"
//                       placeholder="Enter your UPI ID (e.g., user@paytm)"
//                       value={bankInfo.upiId || ""}
//                       onChange={(e) => setBankInfo((prev) => ({ ...prev, upiId: e.target.value }))}
//                       className={`w-full h-16 px-6 text-lg text-gray-600 border rounded-xl focus:outline-none transition-colors ${
//                         errors.upiId
//                           ? "border-red-500 focus:border-red-500"
//                           : "border-gray-400 focus:border-black"
//                       }`}
//                     />
//                     <ErrorMessage message={errors.upiId} />
//                     <p className="text-xs text-gray-500 mt-1">
//                       Your UPI ID from any UPI app like PhonePe, Google Pay, Paytm, etc.
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="border border-gray-300 rounded-xl p-4 text-center">
//                       <div className="text-2xl mb-2">📱</div>
//                       <div className="text-sm font-medium text-gray-700">PhonePe</div>
//                     </div>
//                     <div className="border border-gray-300 rounded-xl p-4 text-center">
//                       <div className="text-2xl mb-2">💳</div>
//                       <div className="text-sm font-medium text-gray-700">Google Pay</div>
//                     </div>
//                   </div>

//                   <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
//                     <p className="text-sm text-blue-700">
//                       <strong>How it works:</strong> You'll be redirected to your UPI app to
//                       authorize the payment of ₹{Math.round(planDetails.price * 83)}.
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Others */}
//               {selectedMethod === "others" && (
//                 <div className="space-y-6">
//                   <div className="relative">
//                     <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500">
//                       <svg
//                         width="20"
//                         height="20"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
//                           fill="currentColor"
//                         />
//                       </svg>
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="Search for your bank"
//                       className="w-full h-16 pl-14 pr-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                     {["PayPal", "Apple Pay", "Google Pay"].map((method, index) => (
//                       <div
//                         key={index}
//                         className="aspect-video border border-gray-400 rounded-xl flex items-center justify-center bg-gray-50 hover:border-gray-600 transition-colors cursor-pointer"
//                       >
//                         <div className="text-sm font-medium text-gray-700">{method}</div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="text-center text-gray-500 text-sm">
//                     Additional payment methods coming soon
//                   </div>
//                 </div>
//               )}
//             </section>
//           </div>

//           {/* Right - Plan details */}
//           <div className="lg:pl-8">
//             <section className="sticky top-8">
//               <h2 className="text-3xl font-bold text-black mb-6">Plan Details</h2>
//               <div className="border border-gray-400 rounded-2xl p-8 mb-6">
//                 <div className="mb-8">
//                   <h3 className="text-2xl text-black mb-2">{planDetails.name}</h3>
//                   {/* <p className="text-base text-gray-600 mb-6">{planDetails.description}</p> */}
//                   <div className="mb-8">
//                     <span className="text-4xl font-bold text-black">${planDetails.price}</span>
//                     <span className="text-sm text-gray-500 ml-2">/ one time payment</span>
//                   </div>
//                 </div>

//                 {/* <div className="mb-8">
//                   <h4 className="text-base font-bold text-black mb-4">This includes:</h4>
//                   <div className="space-y-3">
//                     {features.map((feature, index) => (
//                       <PlanFeature key={index} text={feature} />
//                     ))}
//                   </div>
//                 </div> */}

//                 <div className="flex justify-between items-center pt-6 border-t border-gray-200">
//                   <span className="text-lg font-medium text-gray-600">Total</span>
//                   <span className="text-2xl font-bold text-black">${planDetails.price}</span>
//                 </div>

//                 <button
//                   onClick={processPayment}
//                   disabled={
//                     isLoading || (selectedMethod === "credit" && (stripeLoading || !cardReady))
//                   }
//                   className="w-full bg-black text-white text-lg font-medium py-4 px-6 rounded-xl hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mt-6"
//                 >
//                   {isLoading ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                           fill="none"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Processing...
//                     </span>
//                   ) : (
//                     `Pay $${planDetails.price}`
//                   )}
//                 </button>

//                 <div className="text-center text-sm text-gray-500 mt-4">
//                   <p>By completing this purchase, you agree to our</p>
//                   <p>
//                     <a href="#" className="underline hover:text-gray-700">
//                       Terms of Service
//                     </a>{" "}
//                     and{" "}
//                     <a href="#" className="underline hover:text-gray-700">
//                       Privacy Policy
//                     </a>
//                   </p>
//                 </div>
//               </div>

//               <div className="text-center text-sm text-gray-500">
//                 <p className="flex items-center justify-center gap-2">
//                   <svg
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"
//                       fill="currentColor"
//                     />
//                   </svg>
//                   Secure payment powered by industry-leading encryption
//                 </p>
//               </div>
//             </section>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Payment;

//From Aadesh Branch
import React, { useEffect, useState, useCallback, useRef } from "react";
import PaymentSuccess from "./PymentSuccess";

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
  upiId?: string; // optional, used for UPI input
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
  const [selectedMethod, setSelectedMethod] = useState<"credit" | "bank" | "upi" | "others">(
    "credit"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [billingInfo, setBillingInfo] = useState<BillingFormData>({
    fullName: "",
    email: "",
    companyName: "",
  });
  const [bankInfo, setBankInfo] = useState<BankAccountData>({
    accountNumber: "",
    routingNumber: "",
    accountType: "checking",
    accountHolderName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [success, setSuccess] = useState(false);

  // Stripe
  const [stripe, setStripe] = useState<any>(null);
  const [elements, setElements] = useState<any>(null);
  const [stripeLoading, setStripeLoading] = useState(true);
  const [cardReady, setCardReady] = useState(false);
  const cardMountRef = useRef<HTMLDivElement | null>(null);
  const cardElementRef = useRef<any>(null);

  const features = [
    "50 bids per month",
    "50 skills learning",
    "Custom cover photo",
    "Unlimited revisions",
    "Unlock rewards",
  ];

  const planDetails = {
    name: "Founding Lifetime Member",
    price: 179700,
    description: "Seats available for 50 members",
  };

  // Initialize Stripe and create Elements + Card element
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

      // Mount once container is available
      const mountCard = () => {
        if (cancelled) return;
        if (cardMountRef.current) {
          try {
            cardEl.mount(cardMountRef.current);
          } catch (err) {
            console.error("Mount error:", err);
          }
        } else {
          // Try again next frame
          requestAnimationFrame(mountCard);
        }
      };
      mountCard();
    };

    const initializeStripe = async () => {
      try {
        setStripeLoading(true);
        // If Stripe already on window
        if ((window as any).Stripe) {
          const s = (window as any).Stripe(
            "pk_live_51RPvxVGq7lR7zc6NAc818PzlCvPUUm7GN01P5GyrWE0gdtopHrbOk68uyBiCyXBwuQZtdID4MfUTuQQqD3F9Hcoc00ZEoUsoVL"
          );
          await setupStripeElements(s);
          return;
        }
        // Load script
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
      } catch {}
    };
  }, []);

  // Validation
  const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateRoutingNumber = (routing: string): boolean => {
    if (!/^\d{9}$/.test(routing)) return false;
    const d = routing.split("").map(Number);
    const checksum =
      (3 * (d[0] + d[3] + d[6]) + 7 * (d[1] + d[4] + d[7]) + (d[2] + d[5] + d[8])) % 10;
    return checksum === 0;
  };

  const validateBillingInfo = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;
    if (!billingInfo.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      ok = false;
    }
    if (!billingInfo.email.trim()) {
      newErrors.email = "Email is required";
      ok = false;
    } else if (!validateEmail(billingInfo.email)) {
      newErrors.email = "Please enter a valid email address";
      ok = false;
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return ok;
  };

  const validateBankAccount = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    if (!bankInfo.accountHolderName.trim()) {
      newErrors.accountHolderName =
        "Account holder name is required and must match your bank records";
      ok = false;
    }
    if (!bankInfo.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required";
      ok = false;
    } else if (bankInfo.accountNumber.length < 8 || bankInfo.accountNumber.length > 17) {
      newErrors.accountNumber = "Account number must be between 8-17 digits";
      ok = false;
    } else if (!/^\d+$/.test(bankInfo.accountNumber)) {
      newErrors.accountNumber = "Account number must contain only digits";
      ok = false;
    }
    if (!bankInfo.routingNumber.trim()) {
      newErrors.routingNumber = "Routing number is required";
      ok = false;
    } else if (!validateRoutingNumber(bankInfo.routingNumber)) {
      newErrors.routingNumber = "Please enter a valid 9-digit US routing number";
      ok = false;
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return ok;
  };

  const validateUpiPayment = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;
    if (!bankInfo.upiId?.trim()) {
      newErrors.upiId = "UPI ID is required";
      ok = false;
    } else {
      const upiRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+$/;
      if (!upiRegex.test(bankInfo.upiId)) {
        newErrors.upiId = "Please enter a valid UPI ID (e.g., user@paytm)";
        ok = false;
      }
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return ok;
  };

  const handleBillingChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setBillingInfo((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof ValidationErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleBankChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setBankInfo((prev) => ({ ...prev, [name]: value as any }));
      if (errors[name as keyof ValidationErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const getAuthToken = (): string | null =>
    localStorage.getItem("access_token") || sessionStorage.getItem("access_token") || null;

  // const processPayment = async () => {
  //   try {
  //     setErrors({});

  //     if (!validateBillingInfo()) return;

  //     // Handle unavailable methods early
  //     if (selectedMethod === "upi" || selectedMethod === "others") {
  //       if (selectedMethod === "upi" && !validateUpiPayment()) return;
  //       setErrors({
  //         payment: "This payment method is not supported yet. Please use Credit Card or Bank.",
  //       });
  //       return;
  //     }

  //     if (selectedMethod === "bank" && !validateBankAccount()) return;

  //     if (selectedMethod === "credit") {
  //       if (stripeLoading || !stripe || !elements) {
  //         setErrors({ payment: "Payment system is still loading. Please wait a moment." });
  //         return;
  //       }
  //     }

  //     const token = getAuthToken();
  //     if (!token) {
  //       setErrors({ payment: "Authentication required. Please log in again." });
  //       return;
  //     }

  //     setIsLoading(true);

  //     let paymentMethodData: any = {};

  //     if (selectedMethod === "credit") {
  //       const card = elements.getElement("card");
  //       if (!card) {
  //         setErrors({ payment: "Card input not ready. Please refresh and try again." });
  //         setIsLoading(false);
  //         return;
  //       }

  //       const { paymentMethod, error } = await stripe.createPaymentMethod({
  //         type: "card",
  //         card,
  //         billing_details: {
  //           name: billingInfo.fullName,
  //           email: billingInfo.email,
  //         },
  //       });
  //       if (error) throw new Error(error.message);

  //       paymentMethodData = {
  //         payment_method_id: paymentMethod.id,
  //         type: "card",
  //       };
  //     } else if (selectedMethod === "bank") {
  //       paymentMethodData = {
  //         type: "us_bank_account",
  //         us_bank_account: {
  //           account_number: bankInfo.accountNumber,
  //           routing_number: bankInfo.routingNumber,
  //           account_type: bankInfo.accountType,
  //           account_holder_type: "individual",
  //         },
  //         billing_details: {
  //           name: bankInfo.accountHolderName,
  //           email: billingInfo.email,
  //         },
  //       };
  //     }

  //     const response = await fetch("http://31.97.117.28:8001/create-checkout-session/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         amount: planDetails.price, // if backend expects cents, send price*100
  //         product_name: planDetails.name,
  //         billing_info: billingInfo,
  //       }),
  //     });

  //     // payment_method_data: paymentMethodData,
  //     // currency: "usd",

  //     console.log({
  //       amount: planDetails.price,
  //       product_name: planDetails.name,
  //       billing_info: billingInfo,
  //     });

  //     // log everything
  //     console.log("Raw backend response:", response);

  //     const data = await response.json();
  //     if (!response.ok) {
  //       throw new Error(data.error || `Server error: ${response.status}`);
  //     }

  //     if (data.requires_action && data.client_secret) {
  //       const { error: confirmError } = await stripe.confirmCardPayment(data.client_secret);
  //       if (confirmError) throw new Error(confirmError.message);
  //       setSuccess(true);
  //     } else if (data.status === "succeeded") {
  //       setSuccess(true);
  //     } else {
  //       throw new Error(data.error || "Payment processing failed");
  //     }
  //   } catch (err) {
  //     console.error("Payment processing error:", err);
  //     const msg = err instanceof Error ? err.message : "An unexpected error occurred";
  //     setErrors({ payment: msg });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const processPayment = async () => {
    try {
      setErrors({});

      if (!validateBillingInfo()) return;

      // Handle unavailable methods early
      if (selectedMethod === "upi" || selectedMethod === "others") {
        if (selectedMethod === "upi" && !validateUpiPayment()) return;
        setErrors({
          payment: "This payment method is not supported yet. Please use Credit Card or Bank.",
        });
        return;
      }

      if (selectedMethod === "bank" && !validateBankAccount()) return;

      if (selectedMethod === "credit") {
        if (stripeLoading || !stripe || !elements) {
          setErrors({ payment: "Payment system is still loading. Please wait a moment." });
          return;
        }
      }

      const token = getAuthToken();
      if (!token) {
        setErrors({ payment: "Authentication required. Please log in again." });
        return;
      }

      setIsLoading(true);

      // CORRECTED: Send data in the format your backend expects
      const requestData = {
        amount: planDetails.price,
        product_name: planDetails.name,
        billing_info: {
          fullName: billingInfo.fullName,
          email: billingInfo.email,
          companyName: billingInfo.companyName,
        },
      };

      console.log("Sending to backend:", requestData);

      const response = await fetch("https://internship-pro.onrender.com/create-checkout-session/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Parsed response data:", data);

      if (!response.ok) {
        throw new Error(data.error || data.message || `Server error: ${response.status}`);
      }

      // YOUR BACKEND IS USING STRIPE CHECKOUT - REDIRECT TO THE CHECKOUT URL
      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else if (data.sessionId) {
        // Alternative: Use Stripe.js to redirect to checkout
        // This is a fallback if you have the sessionId but not the URL
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

  const PaymentMethodButton: React.FC<{
    icon?: string;
    label: string;
    selected?: boolean;
    onClick: () => void;
  }> = ({ icon, label, selected, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 border text-gray-600 cursor-pointer px-8 py-3 rounded-xl border-solid transition-colors ${
        selected ? "border-black bg-gray-50" : "border-gray-400 hover:border-gray-600"
      } flex-1 min-w-0`}
    >
      {icon && <div dangerouslySetInnerHTML={{ __html: icon }} />}
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );

  const CheckIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"
        fill="black"
      />
    </svg>
  );

  const PlanFeature: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex items-center gap-3 text-base text-gray-600">
      <CheckIcon />
      <span>{text}</span>
    </div>
  );

  const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
    if (!message) return null;
    return <p className="text-red-600 text-sm mt-1">{message}</p>;
  };

  const creditCardIcon = `<svg width="20" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.00423 2.5H18.0042C18.4645 2.5 18.8376 2.87309 18.8376 3.33333V16.6667C18.8376 17.1269 18.4645 17.5 18.0042 17.5H3.00423C2.544 17.5 2.1709 17.1269 2.1709 16.6667V3.33333C2.1709 2.87309 2.544 2.5 3.00423 2.5ZM17.1709 9.16667H3.83757V15.8333H17.1709V9.16667ZM17.1709 7.5V4.16667H3.83757V7.5H17.1709ZM12.1709 12.5H15.5042V14.1667H12.1709V12.5Z" fill="currentColor"></path></svg>`;
  const bankIcon = `<svg width="20" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.16699 16.6665H18.8337V18.3332H2.16699V16.6665ZM3.83366 9.99984H5.50033V15.8332H3.83366V9.99984ZM8.00033 9.99984H9.66699V15.8332H8.00033V9.99984ZM11.3337 9.99984H13.0003V15.8332H11.3337V9.99984ZM15.5003 9.99984H17.167V15.8332H15.5003V9.99984ZM2.16699 5.83317L10.5003 1.6665L18.8337 5.83317V9.1665H2.16699V5.83317ZM3.83366 6.86323V7.49984H17.167V6.86323L10.5003 3.5299L3.83366 6.86323ZM10.5003 6.6665C10.0401 6.6665 9.66699 6.2934 9.66699 5.83317C9.66699 5.37294 10.0401 4.99984 10.5003 4.99984C10.9606 4.99984 11.3337 5.37294 11.3337 5.83317C11.3337 6.2934 10.9606 6.6665 10.5003 6.6665Z" fill="currentColor"></path></svg>`;
  const dropdownIcon = `<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13.3335L5 8.3335H15L10 13.3335Z" fill="currentColor"></path></svg>`;
  const upiIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/></svg>`;

  if (success) {
    return <PaymentSuccess />;
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 text-[16px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left */}
          <div className="space-y-12">
            {errors.payment && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p>{errors.payment}</p>
              </div>
            )}

            {stripeLoading && selectedMethod === "credit" && (
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded">
                <p>Loading payment system...</p>
              </div>
            )}

            {/* Billing */}
            <section>
              <h2 className="text-3xl font-semibold text-black mb-2">Billing Information</h2>
              <p className="text-base font-light text-gray-600 mb-8 mt-6">
                Used for invoices and billing communication
              </p>
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter full name"
                    value={billingInfo.fullName}
                    onChange={handleBillingChange}
                    className={`w-full h-16 px-6 text-lg text-gray-600 border rounded-xl focus:outline-none transition-colors ${
                      errors.fullName
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-400 focus:border-black"
                    }`}
                  />
                  <ErrorMessage message={errors.fullName} />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter billing email"
                    value={billingInfo.email}
                    onChange={handleBillingChange}
                    className={`w-full h-16 px-6 text-lg text-gray-600 border rounded-xl focus:outline-none transition-colors ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-400 focus:border-black"
                    }`}
                  />
                  <ErrorMessage message={errors.email} />
                </div>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter company name (optional)"
                  value={billingInfo.companyName}
                  onChange={handleBillingChange}
                  className="w-full h-16 px-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors"
                />
              </div>
            </section>

            {/* Payment Methods */}
            <section className="hidden">
              <h2 className="text-3xl font-bold text-black mb-6">Pay with</h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                <PaymentMethodButton
                  icon={creditCardIcon}
                  label="Card"
                  selected={selectedMethod === "credit"}
                  onClick={() => setSelectedMethod("credit")}
                />

                {/* These are not needed for now */}
                {/* <PaymentMethodButton
                  icon={bankIcon}
                  label="Bank Account"
                  selected={selectedMethod === 'bank'}
                  onClick={() => setSelectedMethod('bank')}
                />
                <PaymentMethodButton
                  icon={upiIcon}
                  label="UPI"
                  selected={selectedMethod === 'upi'}
                  onClick={() => setSelectedMethod('upi')}
                />
                <PaymentMethodButton
                  label="Others"
                  icon={dropdownIcon}
                  selected={selectedMethod === 'others'}
                  onClick={() => setSelectedMethod('others')}
                /> */}
              </div>

              {/* Credit card form (kept mounted, hidden when not selected) */}
              <div className={`space-y-6 ${selectedMethod === "credit" ? "" : "hidden"}`}>
                <div
                  className={`border rounded-xl p-6 transition-colors ${
                    stripeLoading
                      ? "border-gray-300 bg-gray-50"
                      : "border-gray-400 focus-within:border-black"
                  }`}
                >
                  <div ref={cardMountRef} />
                  {stripeLoading && (
                    <div className="flex items-center justify-center h-[60px] text-gray-500">
                      Loading card form...
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-2">
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
                  Your card details are secure and encrypted by Stripe
                </p>
              </div>
            </section>
            <section>
              {/* Bank account form */}
              {selectedMethod === "bank" && (
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded">
                    <p className="text-sm font-medium mb-1">ACH Bank Transfer Notice</p>
                    <p className="text-xs">
                      Bank account payments may take 3-5 business days to process and will require
                      micro-deposit verification.
                    </p>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="accountHolderName"
                      placeholder="Account holder name (must match bank records)"
                      value={bankInfo.accountHolderName}
                      onChange={handleBankChange}
                      className={`w-full h-16 px-6 text-lg text-gray-600 border rounded-xl focus:outline-none transition-colors ${
                        errors.accountHolderName
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-400 focus:border-black"
                      }`}
                    />
                    <ErrorMessage message={errors.accountHolderName} />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="routingNumber"
                      placeholder="9-digit routing number (e.g., 021000021)"
                      value={bankInfo.routingNumber}
                      onChange={handleBankChange}
                      maxLength={9}
                      pattern="[0-9]{9}"
                      className={`w-full h-16 px-6 text-lg text-gray-600 border rounded-xl focus:outline-none transition-colors ${
                        errors.routingNumber
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-400 focus:border-black"
                      }`}
                    />
                    <ErrorMessage message={errors.routingNumber} />
                    <p className="text-xs text-gray-500 mt-1">
                      Find this on your check or bank statement
                    </p>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="accountNumber"
                      placeholder="Account number (8-17 digits)"
                      value={bankInfo.accountNumber}
                      onChange={handleBankChange}
                      minLength={8}
                      maxLength={17}
                      className={`w-full h-16 px-6 text-lg text-gray-600 border rounded-xl focus:outline-none transition-colors ${
                        errors.accountNumber
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-400 focus:border-black"
                      }`}
                    />
                    <ErrorMessage message={errors.accountNumber} />
                  </div>

                  <div>
                    <select
                      name="accountType"
                      value={bankInfo.accountType}
                      onChange={handleBankChange}
                      className="w-full h-16 px-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors bg-white"
                    >
                      <option value="checking">Checking Account</option>
                      <option value="savings">Savings Account</option>
                    </select>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          <strong>Important:</strong> By providing your bank account details, you
                          authorize us to debit your account for this payment and agree to the ACH
                          authorization terms.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* UPI */}
              {selectedMethod === "upi" && (
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
                    <p className="text-sm font-medium mb-1">UPI Payment</p>
                    <p className="text-xs">
                      Instant payment via UPI. You'll be redirected to complete the payment.
                    </p>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="upiId"
                      placeholder="Enter your UPI ID (e.g., user@paytm)"
                      value={bankInfo.upiId || ""}
                      onChange={(e) => setBankInfo((prev) => ({ ...prev, upiId: e.target.value }))}
                      className={`w-full h-16 px-6 text-lg text-gray-600 border rounded-xl focus:outline-none transition-colors ${
                        errors.upiId
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-400 focus:border-black"
                      }`}
                    />
                    <ErrorMessage message={errors.upiId} />
                    <p className="text-xs text-gray-500 mt-1">
                      Your UPI ID from any UPI app like PhonePe, Google Pay, Paytm, etc.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-300 rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2">📱</div>
                      <div className="text-sm font-medium text-gray-700">PhonePe</div>
                    </div>
                    <div className="border border-gray-300 rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2">💳</div>
                      <div className="text-sm font-medium text-gray-700">Google Pay</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <p className="text-sm text-blue-700">
                      <strong>How it works:</strong> You'll be redirected to your UPI app to
                      authorize the payment of ₹{Math.round(planDetails.price * 83)}.
                    </p>
                  </div>
                </div>
              )}

              {/* Others */}
              {selectedMethod === "others" && (
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search for your bank"
                      className="w-full h-16 pl-14 pr-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {["PayPal", "Apple Pay", "Google Pay"].map((method, index) => (
                      <div
                        key={index}
                        className="aspect-video border border-gray-400 rounded-xl flex items-center justify-center bg-gray-50 hover:border-gray-600 transition-colors cursor-pointer"
                      >
                        <div className="text-sm font-medium text-gray-700">{method}</div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center text-gray-500 text-sm">
                    Additional payment methods coming soon
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right - Plan details */}
          <div className="lg:pl-8">
            <section className="sticky top-8">
              <h2 className="text-3xl font-bold text-black mb-6">Plan Details</h2>
              <div className="border border-gray-400 rounded-2xl p-8 mb-6">
                <div className="mb-8">
                  <h3 className="text-2xl text-black mb-2">{planDetails.name}</h3>
                  {/* <p className="text-base text-gray-600 mb-6">{planDetails.description}</p> */}
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-black">
                      ${planDetails.price / 100}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">/ one time payment</span>
                  </div>
                </div>

                {/* <div className="mb-8">
                  <h4 className="text-base font-bold text-black mb-4">This includes:</h4>
                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <PlanFeature key={index} text={feature} />
                    ))}
                  </div>
                </div> */}

                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                  <span className="text-lg font-medium text-gray-600">Total</span>
                  <span className="text-2xl font-bold text-black">${planDetails.price / 100}</span>
                </div>

                <button
                  onClick={processPayment}
                  disabled={
                    isLoading || (selectedMethod === "credit" && (stripeLoading || !cardReady))
                  }
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
        </div>
      </main>
    </div>
  );
};

export default Payment;
