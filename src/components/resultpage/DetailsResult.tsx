import React, { useEffect, useState } from 'react';

interface User {
  country: string;
  role: string;
  price?: string;
  id: string;
  email: string;
  full_name: string;
  username: string;
  email_verified: boolean;
  paid: boolean;
  iswebinarformfilled: boolean;
  is_staff: boolean;
}
interface CompanyDetails {
  businessName: string;
  industry: string;
  incorporationDate: string;
  address1: string;
  address2: string;
  country: string;
  stageOfGrowth: string;
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
  rndProcess: string;
  hrProcess: string;
  salesProcess: string;
  publicityAdvertisingPlan: string;
  marketingStrategy: string;
  culture: string;
}
interface DetailsResultProps {
  isLoading?: boolean;
}
const DetailsResult: React.FC<DetailsResultProps> = ({ 
  isLoading = false 
}) => {
  const token = localStorage.getItem("access_token");
  const [userData, setUserData] = useState<User | null>(null);
  const [companyData, setCompanyData] = useState<CompanyDetails | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.warn("No access token found in localStorage");
        setDataLoading(false);
        return;
      }
      try {
        setDataLoading(true);
        setError(null);
        const userResponse = await fetch("https://api.prspera.com/extract-user-data/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!userResponse.ok) {
          throw new Error(`HTTP error! Status: ${userResponse.status}`);
        }
        const userData = await userResponse.json();
        setUserData(userData["user_data"]);
        const companyResponse = await fetch("https://api.prspera.com/company-surveys/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!companyResponse.ok) {
          throw new Error(`HTTP error! Status: ${companyResponse.status}`);
        }
        const companyData = await companyResponse.json();
        setCompanyData(companyData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, [token]);
  if (isLoading || dataLoading) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mt-16">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Details Result</h1>
        <p className="text-blue-100 text-sm mt-1">
          Submitted on {companyData?.incorporationDate || 'N/A'}
        </p>
      </div>
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DetailItem label="Name" value={userData?.full_name} />
            <DetailItem label="Alias" value={userData?.username} />
            <DetailItem label="Email ID" value={userData?.email} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Company Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <DetailItem label="Business Name" value={companyData?.businessName} />
              <DetailItem label="Industry" value={companyData?.industry} />
              <DetailItem 
                label="Company Incorporation Date" 
                value={companyData?.incorporationDate} 
              />
              <DetailItem label="Address 1" value={companyData?.address1} />
              <DetailItem label="Address 2" value={companyData?.address2} />
              <DetailItem label="Country" value={companyData?.country} />
              <DetailItem label="Stage of Growth" value={companyData?.stageOfGrowth} />
              <DetailItem label="Company Size" value={companyData?.companySize} />
              <DetailItem label="Your Role" value={companyData?.yourRole} />
              <DetailItem label="Offerings" value={companyData?.offerings} />
            </div>
            <div className="space-y-4">
              <StatusItem 
                label="Company Succession Plan" 
                value={companyData?.companySuccessionPlan} 
              />
              <StatusItem 
                label="Company Business Plan" 
                value={companyData?.companyBusinessPlan} 
              />
              <StatusItem label="Revenues" value={companyData?.revenues} />
              <StatusItem label="Profits" value={companyData?.profits} />
              <StatusItem 
                label="Cash Flow Position" 
                value={companyData?.cashFlowPosition} 
                isPositive={companyData?.cashFlowPosition === 'Strong'}
              />
              <StatusItem 
                label="Market Awareness" 
                value={companyData?.marketAwareness} 
              />
              <StatusItem 
                label="Staff Turnaround" 
                value={companyData?.staffTurnaround} 
                isPositive={companyData?.staffTurnaround === 'LOW'}
              />
              <ProcessItem label="R&D Process" value={companyData?.rndProcess} />
              <ProcessItem label="HR Process" value={companyData?.hrProcess} />
              <ProcessItem label="Sales Process" value={companyData?.salesProcess} />
              <ProcessItem 
                label="Publicity/Advertising Plan" 
                value={companyData?.publicityAdvertisingPlan} 
              />
              <ProcessItem 
                label="Marketing Strategy" 
                value={companyData?.marketingStrategy} 
              />
              <CultureItem label="Culture" value={companyData?.culture} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const DetailItem: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm font-medium text-gray-600 mb-1">{label}</span>
    <span className="text-gray-900 font-semibold">{value || 'N/A'}</span>
  </div>
);
const StatusItem: React.FC<{ 
  label: string; 
  value?: string; 
  isPositive?: boolean; 
}> = ({ label, value, isPositive }) => {
  const getStatusColor = (val: string | undefined, positive?: boolean) => {
    if (!val) return 'text-gray-500';
    if (positive !== undefined) {
      return positive ? 'text-green-600' : 'text-red-600';
    }
    const lowerVal = val.toLowerCase();
    if (lowerVal.includes('exists') || lowerVal.includes('strong') || lowerVal.includes('sufficient')) {
      return 'text-green-600';
    } else if (lowerVal.includes('non-existent') || lowerVal.includes('weak')) {
      return 'text-red-600';
    } else if (lowerVal.includes('unchanged')) {
      return 'text-yellow-600';
    }
    return 'text-gray-900';
  };
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-600 mb-1">{label}</span>
      <span className={`font-semibold ${getStatusColor(value, isPositive)}`}>
        {value || 'N/A'}
      </span>
    </div>
  );
};
const ProcessItem: React.FC<{ label: string; value?: string }> = ({ label, value }) => {
  const isFormal = value?.toLowerCase() === 'formal';
  const displayValue = value || 'N/A';
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-600 mb-1">{label}</span>
      <div className="flex items-center">
        <span className={`font-semibold ${
          !value ? 'text-gray-500' : 
          isFormal ? 'text-blue-600' : 'text-orange-600'
        }`}>
          {displayValue}
        </span>
        {value && (
          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
            isFormal 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            {isFormal ? 'Structured' : 'Flexible'}
          </span>
        )}
      </div>
    </div>
  );
};
const CultureItem: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm font-medium text-gray-600 mb-1">{label}</span>
    <div className="flex items-center">
      <span className="text-gray-900 font-semibold">{value || 'N/A'}</span>
      {value && (
        <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
          Culture
        </span>
      )}
    </div>
  </div>
);
export default DetailsResult;