import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBell, FaShoppingCart, FaQuestionCircle, FaUserCircle } from 'react-icons/fa';

const Header = () => {
    const user = useSelector(state => state.user);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLinkClick = () => {
        setDropdownOpen(false);
    };

    return (
        <header className="bg-black p-4 text-white flex justify-between items-center">
            <div className="flex items-center">
                <img src="/path/to/logo.png" alt="Logo" className="h-8 mr-4" />
                <Link to="/" className="text-md font-bold">Contests4All</Link>
            </div>
            <nav className="flex items-center space-x-4">
                <Link to="/notifications" className="hover:text-gray-400">
                    <FaBell />
                </Link>
                <Link to="/cart" className="hover:text-gray-400">
                    <FaShoppingCart />
                </Link>
                <Link to="/help" className="hover:text-gray-400">
                    <FaQuestionCircle />
                </Link>
                {user.isLoggedIn ? (
                    <div className="relative">
                        <button onClick={handleDropdownToggle} className="flex items-center hover:text-gray-400">
                            <FaUserCircle className="mr-2" />
                            {user.username}
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                <Link to="/member-type" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Member Type</Link>
                                <Link to="/upgrade" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Upgrade</Link>
                                <Link to="/points" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Points Available</Link>
                                <Link to="/instructions" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Instructions</Link>
                                <Link to="/help" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Help</Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="hover:text-gray-400">Login</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
