import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const BrandAssignment: React.FC = () => {
    const navigate=useNavigate();
    const [date, setDate] = useState<string | null>(null);
    useEffect(() => {
        const today = new Date();
        const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
        setDate(formattedDate);
    }, []);
    const handleBackButton = () => {
        navigate('/dashboard');
    };
    return (
        <div className="bg-gray-300 min-h-screen">
            <header className="flex justify-between items-center px-16 py-3 bg-gray-100 w-full fixed z-50 top-0 shadow-md">
                <div className="flex flex-row gap-4 items-center">
                    <button className="text-blue-500 flex items-center" onClick={handleBackButton}>
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
                    </button>
                    <div className="flex flex-col">
                        <span className="text-md font-semibold">BUSINESS DETAILS</span>
                        <span className="text-xs text-gray-500">Add Business Details</span>
                    </div>
                </div>
                <span className="text-sm">{date}</span>
            </header>
        </div>
    )
}
export default BrandAssignment


