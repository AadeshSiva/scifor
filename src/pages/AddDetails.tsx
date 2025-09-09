import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const AddDetails: React.FC = () => {
    const navigate = useNavigate()
    const [date, setDate] = useState<string | null>(null);
    useEffect(() => {
        const today = new Date();
        const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
        setDate(formattedDate);
    }, []);
    const handleBackButton = () => {
        navigate('/dashboard');
    }
    const handleSubmitButton=()=>{
        localStorage.setItem("add-details","true")
    }
    return (
        <div className="bg-gray-300 w-full h-full relative">
            <header className="flex justify-between items-center px-16 py-2 bg-gray-100 w-full h-[5vh] fixed z-50 top-0 shadow-md">
                <div className="flex flex-row gap-4 items-center">
                    <button className="text-blue-500" onClick={handleBackButton}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>
                    <div className="flex flex-col">
                        <span className="text-md font-semibold">BUSINESS DETAILS</span>
                        <span className="text-xs text-gray-500">Add Business Details</span>
                    </div>
                </div>
                <span className="text-sm">{date}</span>
            </header>
            <div className='pt-24 pb-12'>
                <div className="w-4/5 mx-auto  bg-gray-200 shadow-md p-16">
                    <form method='' className="space-y-6">
                        <div className="w-full space-y-4">
                            <div className="flex items-center">
                                <label htmlFor="business-name" className="w-1/3 text-xl font-medium text-left">Business Name:</label>
                                <input type="text" id="business-name" name="business-name" className="w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200" />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="industry" className="w-1/3 text-xl font-medium text-left">Industry:</label>
                                <input type="text" id="industry" name="industry" className="w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200" />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="incorporation-date" className="w-1/3 text-xl font-medium text-left">Company Incorporation Date:</label>
                                <input type="date" id="incorporation-date" name="incorporation-date" className="w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200" />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="address1" className="w-1/3 text-xl font-medium text-left">Address 1:</label>
                                <input type="text" id="address1" name="address1" className="w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200" />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="address2" className="w-1/3 text-xl font-medium text-left">Address 2:</label>
                                <input type="text" id="address2" name="address2" className="w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200" />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="country" className="w-1/3 text-xl font-medium text-left">Country:</label>
                                <input type="text" id="country" name="country" className="w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200" />
                            </div>
                        </div>
                        <div className='flex space-y-4'>
                            <label className="block font-medium text-xl w-1/2 text-left">Stage of Growth:</label>
                            <div className="flex flex-col flex-wrap justify-center gap-8 w-full">
                                <div className='flex items-center space-x-4'>
                                    <span className='w-1/3 text-lg font-medium text-left'>Start up</span>
                                    <label className="flex items-center"><input type="checkbox" name="growth-stage" value="startup" className="mr-2 size-6" /></label>
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <span className='w-1/3 text-lg font-medium text-left'>Growing</span>
                                    <label className="flex items-center"><input type="checkbox" name="growth-stage" value="growing" className="mr-2 size-6" /></label>
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <span className='w-1/3 text-lg font-medium text-left'>Mature</span>
                                    <label className="flex items-center"><input type="checkbox" name="growth-stage" value="mature" className="mr-2 size-6" /></label>
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <span className='w-1/3 text-lg font-medium text-left'>Recently acquired/merged</span>
                                    <label className="flex items-center"><input type="checkbox" name="growth-stage" value="recently-acquired" className="mr-2 size-6"/></label>
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <span className='w-1/3 text-lg font-medium text-left'>Turnaround</span>
                                    <label className="flex items-center"><input type="checkbox" name="growth-stage" value="turnaround" className="mr-2 size-6" /></label>
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <span className='w-1/3 text-lg font-medium text-left'>Crises</span>
                                    <label className="flex items-center"><input type="checkbox" name="growth-stage" value="crises" className="mr-2 size-6"/></label>
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <span className='w-1/3 text-lg font-medium text-left'>Pre-succession</span>
                                    <label className="flex items-center"><input type="checkbox" name="growth-stage" value="crises" className="mr-2 size-6"/></label>
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <label className="block font-medium mb-1 space-y-4 w-1/3 text-left text-xl">Company Size:</label>
                            <div className="flex flex-wrap gap-4">
                                <label className="flex items-center text-lg"><input type="radio" name="company-size" value="small" className="mr-2 size-6" />Small</label>
                                <label className="flex items-center text-lg"><input type="radio" name="company-size" value="medium" className="mr-2 size-6" />Medium</label>
                                <label className="flex items-center text-lg"><input type="radio" name="company-size" value="large" className="mr-2 size-6" />Large</label>
                                <label className="flex items-center text-lg"><input type="radio" name="company-size" value="global" className="mr-2 size-6" />Global</label>
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <label className="block font-medium mb-1 text-left text-xl">Your Role:</label>
                            <div className="w-full flex flex-col space-y-4 items-center justify-center flex-wrap gap-4 text-left">
                                <label className="w-1/3 flex items-center text-md"><input type="radio" name="department" value="executive" className="mr-2 size-6" />Executive/Owner</label>
                                <label className="w-1/3  flex items-center text-md"><input type="radio" name="department" value="advertising" className="mr-2 size-6" />Advertising</label>
                                <label className="w-1/3  flex items-center text-md"><input type="radio" name="department" value="operations" className="mr-2 size-6" />Operations</label>
                                <label className="w-1/3  flex items-center text-md"><input type="radio" name="department" value="customer-service" className="mr-2 size-6" />Customer Service</label>
                                <label className="w-1/3  flex items-center text-md"><input type="radio" name="department" value="publicity" className="mr-2 size-6" />Publicity</label>
                                <label className="w-1/3  flex items-center text-md"><input type="radio" name="department" value="finance" className="mr-2 size-6" />Finance</label>
                                <label className="w-1/3  flex items-center text-md"><input type="radio" name="department" value="marketing" className="mr-2 size-6" />Marketing</label>
                                <label className="w-1/3  flex items-center text-md"><input type="radio" name="department" value="sales" className="mr-2 size-6" />Sales</label>
                                <label className="w-1/3  flex items-center text-md"><input type="radio" name="department" value="technology" className="mr-2 size-6" />Technology</label>
                                <label className="w-1/3  flex items-center text-md"><input type="radio" name="department" value="others" className="mr-2 size-6" />Others<input type="text" name="department" className="mr-2 bg-transparent border-b border-gray-600 outline-none ml-2" /></label>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <label className="block font-medium mb-1 space-y-4 w-1/3 text-left text-xl">Offerings:</label>
                            <div className="flex text-left space-x-4">
                                <label className="flex items-center text-md"><input type="radio" name="offerings" value="products" className="mr-2 size-6" />Products</label>
                                <label className="flex items-center text-md"><input type="radio" name="offerings" value="services" className="mr-2 size-6" />Services</label>
                            </div>
                        </div>
                         <div className='flex flex-row'>
                            <label className="block font-medium mb-1 space-y-4 w-1/3 text-left text-xl">Company Succession Plan:</label>
                            <div className="flex text-left space-x-4">
                                <label className="flex items-center text-md"><input type="radio" name="company-succession-plan" value="EXISTS" className="mr-2 size-6" />EXISTS</label>
                                <label className="flex items-center text-md"><input type="radio" name="company-succession-plan" value="Not-Exist" className="mr-2 size-6" />Not-Exist</label>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <label className="block font-medium mb-1 space-y-4 w-1/3 text-left text-xl">Company Business Plan:</label>
                            <div className="flex text-left space-x-4">
                                <label className="flex items-center text-md"><input type="radio" name="company-business-plan" value="EXISTS" className="mr-2 size-6" />EXISTS</label>
                                <label className="flex items-center text-md"><input type="radio" name="company-business-plan" value="Not-Exist" className="mr-2 size-6" />Not-Exist</label>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <label className="block font-medium mb-1 space-y-4 w-1/3 text-left text-xl">Revenues (from last year):</label>
                            <div className="flex text-left space-x-4">
                                <label className="flex items-center text-md"><input type="radio" name="revenues" value="UPWARDS" className="mr-2 size-6" />UPWARDS</label>
                                <label className="flex items-center text-md"><input type="radio" name="revenues" value="DOWNWARDS" className="mr-2 size-6" />DOWNWARDS</label>
                                 <label className="flex items-center text-md"><input type="radio" name="revenues" value="UNCHANGED" className="mr-2 size-6" />UNCHANGED</label>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <label className="block font-medium mb-1 space-y-4 w-1/3 text-left text-xl">Profits (from last year):</label>
                            <div className="flex text-left space-x-4">
                                <label className="flex items-center text-md"><input type="radio" name="profits" value="UPWARDS" className="mr-2 size-6" />UPWARDS</label>
                                <label className="flex items-center text-md"><input type="radio" name="profits" value="DOWNWARDS" className="mr-2 size-6" />DOWNWARDS</label>
                                 <label className="flex items-center text-md"><input type="radio" name="profits" value="UNCHANGED" className="mr-2 size-6" />UNCHANGED</label>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <label className="block font-medium mb-1 space-y-4 w-1/3 text-left text-xl">Cash Flow Position:</label>
                            <div className="flex text-left space-x-4">
                                <label className="flex items-center text-md"><input type="radio" name="cash-flow-position" value="Weak" className="mr-2 size-6" />Weak</label>
                                <label className="flex items-center text-md"><input type="radio" name="cash-flow-position" value="Sufficient" className="mr-2 size-6" />Sufficient</label>
                                 <label className="flex items-center text-md"><input type="radio" name="cash-flow-position" value="Strong" className="mr-2 size-6" />Strong</label>
                            </div>
                        </div>
                         <div className='flex flex-row'>
                            <label className="block font-medium mb-1 space-y-4 w-1/3 text-left text-xl">Market Awareness:</label>
                            <div className="flex text-left space-x-4">
                                <label className="flex items-center text-md"><input type="radio" name="Market-Awareness" value="Weak" className="mr-2 size-6" />Weak</label>
                                <label className="flex items-center text-md"><input type="radio" name="Market-Awareness" value="Sufficient" className="mr-2 size-6" />Sufficient</label>
                                 <label className="flex items-center text-md"><input type="radio" name="Market-Awareness" value="Strong" className="mr-2 size-6" />Strong</label>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <label className="block font-medium mb-1 space-y-4 w-1/3 text-left text-xl">Staff Turnaround:</label>
                            <div className="flex text-left space-x-4">
                                <label className="flex items-center text-md"><input type="radio" name="Staff-Turnaround" value="Weak" className="mr-2 size-6" />Weak</label>
                                <label className="flex items-center text-md"><input type="radio" name="Staff-Turnaround" value="Sufficient" className="mr-2 size-6" />Sufficient</label>
                                 <label className="flex items-center text-md"><input type="radio" name="Staff-Turnaround" value="Strong" className="mr-2 size-6" />Strong</label>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <label className="block font-medium mb-1 space-y-4 w-1/3 text-left text-xl">R&D Process:</label>
                            <div className="flex text-left space-x-4">
                                <label className="flex items-center text-md"><input type="radio" name="r&d-process" value="Formal" className="mr-2 size-6" />Formal</label>
                                <label className="flex items-center text-md"><input type="radio" name="r&d-process" value="Informal" className="mr-2 size-6" />Informal</label>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <label className="block font-medium mb-1 space-y-4 w-1/3 text-left text-xl">HR Process:</label>
                            <div className="flex text-left space-x-4">
                                <label className="flex items-center text-md"><input type="radio" name="hr-process" value="Formal" className="mr-2 size-6" />Formal</label>
                                <label className="flex items-center text-md"><input type="radio" name="hr-process" value="Informal" className="mr-2 size-6" />Informal</label>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <label className="block font-medium mb-1 space-y-4 w-1/3 text-left text-xl">Sales Process:</label>
                            <div className="flex text-left space-x-4">
                                <label className="flex items-center text-md"><input type="radio" name="sales-process" value="Formal" className="mr-2 size-6" />Formal</label>
                                <label className="flex items-center text-md"><input type="radio" name="sales-process" value="Informal" className="mr-2 size-6" />Informal</label>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <label className="block font-medium mb-1 space-y-4 w-1/3 text-left text-xl">Publicity/Advertising Plan:</label>
                            <div className="flex text-left space-x-4">
                                <label className="flex items-center text-md"><input type="radio" name="Publicity-Advertising-Plan" value="Formal" className="mr-2 size-6" />Formal</label>
                                <label className="flex items-center text-md"><input type="radio" name="Publicity-Advertising-Plan" value="Informal" className="mr-2 size-6" />Informal</label>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <label className="block font-medium mb-1 space-y-4 w-1/3 text-left text-xl">Marketing Strategy:</label>
                            <div className="flex text-left space-x-4">
                                <label className="flex items-center text-md"><input type="radio" name="Marketing-Strategy" value="Formal" className="mr-2 size-6" />Formal</label>
                                <label className="flex items-center text-md"><input type="radio" name="Marketing-Strategy" value="Informal" className="mr-2 size-6" />Informal</label>
                            </div>
                        </div>
                        <div className='flex'>
                            <label htmlFor="culture" className="block font-medium mb-1 space-y-4 w-1/3 text-left text-xl">Culture:</label>
                            <textarea id="culture" name="culture" className="w-1/3 border border-gray-400 bg-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200" placeholder='In a few words, describe our company culture'></textarea>
                        </div>

                        <div className='w-full flex justify-center items-center'>
                            <button type="submit" className="w-1/5 bg-black py-2 rounded-3xl border border-[#DBA958] text-[#DBA958]" onClick={handleSubmitButton}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default AddDetails;
