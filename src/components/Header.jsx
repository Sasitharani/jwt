import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaBell, FaShoppingCart, FaQuestionCircle, FaUserCircle } from 'react-icons/fa';
import { logout, loginSuccess, login } from '../store/userSlice'; // Import logout and loginSuccess actions
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import Swal from 'sweetalert2';

const Header = () => {
    const user = useSelector(state => state.user);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn); // Get isLoggedIn from slice
    const role = useSelector(state => state.user.role); // Get role from Redux store

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [votesData, setVotesData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        //console.log('1.#########From Header isLoggedIn from slice:', isLoggedIn); // Log isLoggedIn value
        const email = localStorage.getItem('email');
     
        if (email && isLoggedIn) {
            dispatch(loginSuccess({ email }));
            //console.log('Logged in');
        }
    }, [dispatch, isLoggedIn]);

    useEffect(() => {
      //  console.log('User state updated:', user);
    }, [user]);

    useEffect(() => {
        const sliceValues = [user, isLoggedIn, votesData];
        //console.log('Slice values sasi check if it is being fetched in the beginnig:', sliceValues);
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            fetchVotesDetails();
        }
    }, [isLoggedIn]);

    const fetchVotesDetails = async () => {
        try {
            const response = await axios.post('https://jwt-rj8s.onrender.com/api/fetchVotesDetails', {
                username: user.username,
                email: user.email
            });
            //console.log("Header Response data after fetching data",response.data);
            setVotesData(response.data);

            const LikesAvailable = response.data.map(vote => vote.LikesAvailable);
            const firstLikeUsed = response.data.length > 0 ? response.data[0].LikesUsed : null;
     
            dispatch(loginSuccess({ 
                username: user.username, 
                email: user.email, 
                votesData: response.data, 
                votesUsed: firstLikeUsed,
                votesAvailable: LikesAvailable // Include LikesAvailable in the payload
            })); // Save firstLikeUsed to Redux store
        } catch (error) {
            console.error('Error in fetchVotesDetails:', error);
            Swal.fire('Error', error.response.data, 'error');
        }
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLinkClick = () => {
        setDropdownOpen(false);
    };

    const handleLogout = () => {
       // console.log('Dispatching logout action from Header.jsx');
        dispatch(logout({ meta: { fileName: 'Header.jsx' } }));
        navigate('/login');
    };

    useEffect(() => {
        if (isLoggedIn) {
            const createUserSessionDB = async () => {
                try {
                    const response = await axios.post('https://jwt-rj8s.onrender.com/api/create-user-session-db');
                    console.log(response.data.message);
                } catch (error) {
                    console.error('Error creating user session DB:', error);
                    console.log('Failed to create user session DB');
                }
            };

            createUserSessionDB();
        }
    }, [isLoggedIn]);

    return (
        <header className="bg-black p-4 text-white flex justify-between items-center">
            <div className="flex items-center">
                <img src="/path/to/logo.png" alt="Logo" className="h-8 mr-4" />
                <Link to="/" className="text-md font-bold">REACTGROOVY4All</Link>
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
                {isLoggedIn ? ( // Check if user is logged in
                    <div className="relative z-50">
                        <button onClick={handleDropdownToggle} className="flex items-center hover:text-gray-400">
                            <FaUserCircle className="mr-2" />
                            <div className="flex flex-col items-start">
                                <span>{user.username}</span> {/* Display username */}
                                <span>{user.email}</span> {/* Display email */}
                            </div>
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                <Link to="/uploadImage" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Submit a Image</Link>
                                {role === 'admin' && (
                                    <Link to="/upload/AllUploads" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Uploads</Link>
                                )}
                                <Link to="/instructions" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Instructions</Link>
                                {role === 'admin' && (
                                    <Link to="/test" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Test</Link>
                                )}
                                <Link to="/help" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Help</Link>
                                <Link to="/voting/UserVoting1" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>User Voting</Link>
                                <Link to="/compress-image" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Compress Image</Link>
                                <Link to="/user-profile" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>User Profile</Link>
                                <Link to="/spinning-wheel" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLinkClick}>Spinning Wheel</Link> {/* Add link for SpinningWheel */}
                                <div className="block px-4 py-2 hover:bg-gray-200">
                                    {Array.isArray(votesData) && votesData.map((vote, index) => (
                                        <div key={index}>
                                            {'Votes Available'}: {vote.LikesAvailable}
                                        </div>
                                    ))}
                                </div>
                                <div className="block px-4 py-2 hover:bg-gray-200">
                                    Role: {role.charAt(0).toUpperCase() + role.slice(1)} {/* Display the role with capitalized first letter */}
                                </div>
                                <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-200 w-full text-left">Logout</button>
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
