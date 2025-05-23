import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/AuthContext"; // Adjust path as needed

// Header Component
const NavBar: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, isAuthenticated, logout, isLoading } = useAuth()
    const [showDropdown, setShowDropdown] = useState(false)

    const handleLogout = () => {
        logout()
        setShowDropdown(false)
        navigate('/')
    }

    const getInitials = (fullName: string) => {
        return fullName.split(' ').map(name => name.charAt(0).toUpperCase()).join('')
    }

    if (isLoading) {
        return (
            <div className="max-w-none w-full bg-white mx-auto max-md:max-w-[991px] max-sm:max-w-screen-sm">
                <header className="flex justify-between items-center shadow-[0_7px_5.4px_0_rgba(0,0,0,0.25)] bg-white px-[49px] py-6 max-sm:p-5">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9229a48c4e1f3b70f2231b9effad024402047f5"
                        alt="Company Logo"
                        className="w-[195px] h-[34px] cursor-pointer"
                        onClick={() => { navigate("/") }}
                    />
                    <div className="w-[194px] h-12 bg-gray-200 animate-pulse rounded"></div>
                </header>
            </div>
        )
    }

    return (
        <div className="max-w-none w-full bg-white mx-auto max-md:max-w-[991px] max-sm:max-w-screen-sm">
            <header className="flex justify-between items-center shadow-[0_7px_5.4px_0_rgba(0,0,0,0.25)] bg-white px-[49px] py-6 max-sm:p-5">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9229a48c4e1f3b70f2231b9effad024402047f5"
                    alt="Company Logo"
                    className="w-[195px] h-[34px] cursor-pointer"
                    onClick={() => { navigate("/") }}
                />
                <nav className="flex gap-20 max-md:gap-10 max-sm:hidden">
                    <a onClick={() => { navigate("/coi") }} className="text-black text-2xl font-normal cursor-pointer">COI</a>
                    <a className="text-black text-2xl font-normal cursor-pointer">WINNING</a>
                    <a className="text-black text-2xl font-normal cursor-pointer">FREE</a>
                    <a onClick={() => { navigate("/join") }} className="text-black text-2xl font-normal cursor-pointer">JOIN</a>
                    <a onClick={() => { navigate("/chat") }} className="text-black text-2xl font-normal cursor-pointer">CHAT</a>
                </nav>
                
                {isAuthenticated ? (
                    <div className="relative">
                        <button
                            className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-semibold hover:bg-gray-800 transition-colors"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            {user?.full_name ? getInitials(user.full_name) : 'U'}
                        </button>
                        
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                    <div className="font-medium">{user?.full_name}</div>
                                    <div className="text-gray-500">{user?.email}</div>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowDropdown(false)
                                        navigate('/profile')
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={() => {
                                        setShowDropdown(false)
                                        navigate('/settings')
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Settings
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        className={`rounded text-white text-base w-[194px] bg-black p-4 hover:bg-gray-800 transition-colors ${location.pathname === "/auth" ? "invisible" : "visible"}`}
                        onClick={() => { navigate('/auth') }}
                    >
                        Login
                    </button>
                )}
            </header>
            
            {/* Overlay to close dropdown when clicking outside */}
            {showDropdown && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowDropdown(false)}
                />
            )}
        </div>
    );
};

export default NavBar