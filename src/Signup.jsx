import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UsernameAuthentication from './signUp/Username';
import EmailAuthentication from './signUp/Email';
import PasswordVerification from './signUp/Password';
import Swal from 'sweetalert2';
import PasswordMatch from './signUp/PasswordMatch';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const [emailAvailable, setEmailAvailable] = useState(true); // Add email availability state
    const [passwordError, setPasswordError] = useState(' Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.'); // Add password error state
    const [isPasswordValid, setIsPaswordValid] = useState(false); // Add form validity state
    const [isEmailValid, setIsEmailValid] = useState(false); // Add form validity state
    const[EmailMessage, setEmailMessage] = useState(''); // Add email message state
    const [passwordMatch, setPasswordMatch] = useState('');
    const [matchPasswordVerified, setMatchPasswordVerified] = useState(false);

    const navigate = useNavigate();

    //console.log('loading in the begining:-', loading)   

    const handleSignup = async (e) => {
        e.preventDefault();
        validateForm(); // Validate form on submit
        setLoading(true); // Set loading to true
 
        if (isEmailValid && isPasswordValid && matchPasswordVerified) {
            console.log('Password while submiting', password)
            try {
      
                const response = await axios.post('https://jwt-rj8s.onrender.com/signup', {
                    username,
                    email,
                    password
                });
                setMessage('User registered successfully!');
                Swal.fire({
                    title: 'Successfully Registered!',
                    icon: 'success',
                    confirmButtonText: 'Login',
                    preConfirm: () => {
                        navigate('/login');
                    }
                });
            } catch (error) {
                setMessage('Signup failed. Please try again.');
                Swal.fire({
                    title: 'Signup Failed',
                    text: 'Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } 
        }
    };


 const validateForm = () => { // Validate form
    console.log('Validity of Email:-', isEmailValid + 'Validity of Password:-', isPasswordValid);
    // if (username && email && emailAvailable && password && !passwordError) {
    //     // console.log('Form is valid');
    //     setIsFormValid(true);
    // } else {
    //     setIsFormValid(false);
    // }
};




    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
            {loading && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
                    
                </div>
                
            )}
            <div className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-md ${loading ? 'blur-sm' : ''}`}>
            
            
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <form onSubmit={handleSignup}>
                <UsernameAuthentication username={username} setUsername={setUsername} />
                <EmailAuthentication
                email={email}
                setEmail={setEmail}
                setEmailAvailable={setEmailAvailable}
                setEmailMessage={setEmailMessage}
                emailMessage={EmailMessage} 
                emailAvailable={emailAvailable}
                validateForm={validateForm}
                loading={loading}
                setLoading={setLoading}
               setIsEmailValid={setIsEmailValid}
               isEmailValid={isEmailValid}
                />

                <PasswordVerification
                password={password}
                setPassword={setPassword}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
                setIsPasswordValid={setIsPaswordValid}
                isPasswordValid={isPasswordValid}
                />
                <PasswordMatch
                    password={password}
                    matchPassword={passwordMatch}
                    setMatchPassword={setPasswordMatch}
                    passwordError={passwordError}
                    setPasswordError={setPasswordError}
                    isPasswordValid={isPasswordValid}
                    setMatchPasswordVerified={setMatchPasswordVerified}
                />

                    <div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className={`font-bold py-2 px-4 rounded bg-green-500 text-white hover:bg-green-600 text-white'
                                `}
                            >
                                Sign Up
                            </button>
                  
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default Signup;