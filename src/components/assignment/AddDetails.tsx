import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

interface FormData {
  businessName: string;
  industry: string;
  incorporationDate: string;
  address1: string;
  address2: string;
  country: string;
  growthStage: string[];
  companySize: string;
  yourRole: string;
  offerings: string;
  companySuccessionPlan: string;
  companyBusinessPlan: string;
  revenues: string;
  profits: string;
  cashFlowPosition: string;
  marketAwareness: string;
  staffTurnaround: string;
  rdProcess: string;
  hrProcess: string;
  salesProcess: string;
  publicityAdvertisingPlan: string;
  marketingStrategy: string;
  culture: string;
  yourRoleOther?: string;
}
const AddDetails: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string | null>(null);
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(today.getDate()).padStart(2, "0")}/${today.getFullYear()}`;
    setDate(formattedDate);
  }, []);
  const handleBackButton = () => {
    navigate("/dashboard");
  };
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    industry: "",
    incorporationDate: "",
    address1: "",
    address2: "",
    country: "",
    growthStage: [],
    companySize: "",
    yourRole: "",
    offerings: "",
    companySuccessionPlan: "",
    companyBusinessPlan: "",
    revenues: "",
    profits: "",
    cashFlowPosition: "",
    marketAwareness: "",
    staffTurnaround: "",
    rdProcess: "",
    hrProcess: "",
    salesProcess: "",
    publicityAdvertisingPlan: "",
    marketingStrategy: "",
    culture: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      const checked = checkbox.checked;
      const checkboxValue = checkbox.value;
      setFormData((prev) => {
        if (checked) {
          return {
            ...prev,
            growthStage: [...prev.growthStage, checkboxValue],
          };
        } else {
          return {
            ...prev,
            growthStage: prev.growthStage.filter(
              (item) => item !== checkboxValue
            ),
          };
        }
      });
    }else if(formData.yourRole==="Other"){
      formData.yourRole=formData.yourRoleOther
    }
     else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(value=="Other"){
      setOtherNav(true);
    }
    else if(value=="Executive/Owner" || value== "Advertising" || value== "Operations" || value== "Customer Service" || value== "Publicity" || value== "Finance" || value== "Marketing" || value== "Sales" || value== "Technology"){
      setOtherNav(false)
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasEmpty = Object.entries(formData).some(
      ([key, value]) =>
        (value === "" || (Array.isArray(value) && value.length === 0)) &&
        key !== "address2" &&
        key !== "departmentOther"
    );
    if (hasEmpty) {
      toast.error(" Please fill all required fields before submitting!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    toast.success(" Business details submitted successfully!", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
    });
    setTimeout(() => {
      sessionStorage.setItem("add-details", "true");
      navigate("/dashboard");
    }, 2000);
  };
  const accessToken = localStorage.getItem("access_token")
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://api.prspera.com/company-surveys/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [accessToken, formData]);
  const [OtherNav,setOtherNav]=useState(false);
  console.log(formData)
  return (
    <>
      <div className="bg-gray-300 min-h-screen">
        <header className="flex justify-between items-center px-16 py-3 bg-gray-100 w-full fixed z-50 top-0 shadow-md">
          <div className="flex flex-row gap-4 items-center">
            <button
              className="text-blue-500 flex items-center"
              onClick={handleBackButton}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
            </button>
            <div className="flex flex-col">
              <span className="text-md font-semibold">BUSINESS DETAILS</span>
              <span className="text-xs text-gray-500">
                Add Business Details
              </span>
            </div>
          </div>
          <span className="text-sm">{date}</span>
        </header>
        <div className="pt-24 pb-12">
          <div className="w-4/5 mx-auto bg-white shadow-md p-8 md:p-16 rounded-lg">
            <form className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-2">
                  Basic Information
                </h2>
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                  <label
                    htmlFor="business-name"
                    className="w-full md:w-1/3 text-lg font-medium mb-2 md:mb-0"
                  >
                    Business Name:
                  </label>
                  <input
                    type="text"
                    id="business-name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                  <label
                    htmlFor="industry"
                    className="w-full md:w-1/3 text-lg font-medium mb-2 md:mb-0"
                  >
                    Industry:
                  </label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                  <label
                    htmlFor="incorporation-date"
                    className="w-full md:w-1/3 text-lg font-medium mb-2 md:mb-0"
                  >
                    Company Incorporation Date:
                  </label>
                  <input
                    type="date"
                    id="incorporation-date"
                    name="incorporationDate"
                    value={formData.incorporationDate}
                    onChange={handleChange}
                    className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                  <label
                    htmlFor="address1"
                    className="w-full md:w-1/3 text-lg font-medium mb-2 md:mb-0"
                  >
                    Address 1:
                  </label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                  <label
                    htmlFor="address2"
                    className="w-full md:w-1/3 text-lg font-medium mb-2 md:mb-0"
                  >
                    Address 2:
                  </label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                  <label
                    htmlFor="country"
                    className="w-full md:w-1/3 text-lg font-medium mb-2 md:mb-0"
                  >
                    Country:
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-2">
                  Company Details
                </h2>
                <div className="flex flex-col md:flex-row">
                  <label className="block font-medium mb-4 w-full md:w-1/3 text-left text-xl">
                    Stage of Growth:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {[
                      "Start up",
                      "Growing",
                      "Mature",
                      "Recently acquired/merged",
                      "Turnaround",
                      "Crises",
                      "Pre-succession",
                    ].map((stage) => (
                      <div key={stage} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`growth-${stage.replace(/\s+/g, "-")}`}
                          name="growthStage"
                          value={stage}
                          checked={formData.growthStage.includes(stage)}
                          onChange={handleChange}
                          className="mr-3 h-5 w-5"
                        />
                        <label
                          htmlFor={`growth-${stage.replace(/\s+/g, "-")}`}
                          className="text-lg"
                        >
                          {stage}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <label className="block font-medium mb-4 w-full md:w-1/3 text-left text-xl">
                    Company Size:
                  </label>
                  <div className="flex flex-wrap gap-6 w-full">
                    {["Small", "Medium", "Large", "Global"].map((size) => (
                      <label key={size} className="flex items-center">
                        <input
                          type="radio"
                          name="companySize"
                          value={size}
                          checked={formData.companySize === size}
                          onChange={handleRadioChange}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <label className="block font-medium mb-4 w-full md:w-1/3 text-left text-xl">
                    Your Role:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {[
                      "Executive/Owner",
                      "Advertising",
                      "Operations",
                      "Customer Service",
                      "Publicity",
                      "Finance",
                      "Marketing",
                      "Sales",
                      "Technology",
                      "Other",
                    ].map((role) => (
                      <label key={role} className="flex items-center">
                        <input
                          type="radio"
                          name="yourRole"
                          value={role}
                          checked={formData.yourRole === role}
                          onChange={handleRadioChange}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {OtherNav && (
                  <div className="flex flex-col md:flex-row md:items-center">
                    <label className="w-full md:w-1/3 text-lg font-medium mb-2 md:mb-0">
                      Specify Role:
                    </label>
                    <input
                      type="text"
                      name="yourRoleOther"
                      value={formData.yourRoleOther || ""}
                      onChange={handleChange}
                      className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row">
                  <label className="block font-medium mb-4 w-full md:w-1/3 text-left text-xl">
                    Offerings:
                  </label>
                  <div className="flex gap-6 w-full">
                    {["Products", "Services"].map((offering) => (
                      <label key={offering} className="flex items-center">
                        <input
                          type="radio"
                          name="offerings"
                          value={offering}
                          checked={formData.offerings === offering}
                          onChange={handleRadioChange}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">{offering}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-2">
                  Business Health
                </h2>
                <div className="flex flex-col md:flex-row">
                  <label className="block font-medium mb-4 w-full md:w-1/3 text-left text-lg">
                    Company Succession Plan:
                  </label>
                  <div className="flex flex-wrap gap-6 w-full">
                    {["EXISTS", "Not-Exist"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="companySuccessionPlan"
                          value={option}
                          checked={formData.companySuccessionPlan === option}
                          onChange={handleRadioChange}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <label className="block font-medium mb-4 w-full md:w-1/3 text-left text-lg">
                    Company Business Plan:
                  </label>
                  <div className="flex flex-wrap gap-6 w-full">
                    {["EXISTS", "Not-Exist"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="companyBusinessPlan"
                          value={option}
                          checked={formData.companyBusinessPlan === option}
                          onChange={handleRadioChange}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <label className="block font-medium mb-4 w-full md:w-1/3 text-left text-lg">
                    Revenues (from last year):
                  </label>
                  <div className="flex flex-wrap gap-6 w-full">
                    {["UPWARDS", "DOWNWARDS", "UNCHANGED"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="revenues"
                          value={option}
                          checked={formData.revenues === option}
                          onChange={handleRadioChange}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <label className="block font-medium mb-4 w-full md:w-1/3 text-left text-lg">
                    Profits (from last year):
                  </label>
                  <div className="flex flex-wrap gap-6 w-full">
                    {["UPWARDS", "DOWNWARDS", "UNCHANGED"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="profits"
                          value={option}
                          checked={formData.profits === option}
                          onChange={handleRadioChange}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <label className="block font-medium mb-4 w-full md:w-1/3 text-left text-lg">
                    Cash Flow Position:
                  </label>
                  <div className="flex flex-wrap gap-6 w-full">
                    {["Weak", "Sufficient", "Strong"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="cashFlowPosition"
                          value={option}
                          checked={formData.cashFlowPosition === option}
                          onChange={handleRadioChange}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <label className="block font-medium mb-4 w-full md:w-1/3 text-left text-lg">
                    Market Awareness:
                  </label>
                  <div className="flex flex-wrap gap-6 w-full">
                    {["Weak", "Sufficient", "Strong"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="marketAwareness"
                          value={option}
                          checked={formData.marketAwareness === option}
                          onChange={handleRadioChange}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <label className="block font-medium mb-4 w-full md:w-1/3 text-left text-lg">
                    Staff Turnaround:
                  </label>
                  <div className="flex flex-wrap gap-6 w-full">
                    {["Weak", "Sufficient", "Strong"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="staffTurnaround"
                          value={option}
                          checked={formData.staffTurnaround === option}
                          onChange={handleRadioChange}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <label className="block font-medium mb-4 w-full md:w-1/3 text-left text-lg">
                    R&D Process:
                  </label>
                  <div className="flex flex-wrap gap-6 w-full">
                    {["Formal", "Informal"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="rdProcess"
                          value={option}
                          checked={formData.rdProcess === option}
                          onChange={handleRadioChange}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <label className="block font-medium mb-4 w-full md:w-1/3 text-left text-lg">
                    HR Process:
                  </label>
                  <div className="flex flex-wrap gap-6 w-full">
                    {["Formal", "Informal"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="hrProcess"
                          value={option}
                          checked={formData.hrProcess === option}
                          onChange={handleRadioChange}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <label className="block font-medium mb-4 w-full md:w-1/3 text-left text-lg">
                    Sales Process:
                  </label>
                  <div className="flex flex-wrap gap-6 w-full">
                    {["Formal", "Informal"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="salesProcess"
                          value={option}
                          checked={formData.salesProcess === option}
                          onChange={handleRadioChange}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <label className="block font-medium mb-4 w-full md:w-1/3 text-left text-lg">
                    Publicity/Advertising Plan:
                  </label>
                  <div className="flex flex-wrap gap-6 w-full">
                    {["Formal", "Informal"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="publicityAdvertisingPlan"
                          value={option}
                          checked={formData.publicityAdvertisingPlan === option}
                          onChange={handleRadioChange}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <label className="block font-medium mb-4 w-full md:w-1/3 text-left text-lg">
                    Marketing Strategy:
                  </label>
                  <div className="flex flex-wrap gap-6 w-full">
                    {["Formal", "Informal"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="marketingStrategy"
                          value={option}
                          checked={formData.marketingStrategy === option}
                          onChange={handleRadioChange}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <label
                    htmlFor="culture"
                    className="block font-medium mb-4 w-full md:w-1/3 text-left text-xl"
                  >
                    Culture:
                  </label>
                  <textarea
                    id="culture"
                    value={formData.culture}
                    onChange={handleChange}
                    name="culture"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                    placeholder="In a few words, describe our company culture"
                  />
                </div>
              </div>
              <div className="w-full flex justify-center items-center pt-8">
                <button
                  onClick={handleFormSubmit}
                  type="submit"
                  className="w-full md:w-1/3 bg-black py-3 rounded-3xl border border-[#DBA958] text-[#DBA958] font-bold hover:bg-[#DBA958] hover:text-black transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default AddDetails;
