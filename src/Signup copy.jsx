import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UsernameAuthentication from './signUp/Username';
import EmailAuthentication from './signUp/Email';
import PasswordVerification from './signUp/Password';
import PhoneNumberVerification from './signUp/Phone';
import'./tailwind.css'
import './index.css'

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailAvailable, setEmailAvailable] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const [phoneNumberAvailable, setPhoneNumberAvailable] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');
    const [phoneNumberMessage, setPhoneNumberMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        setIsFormValid(
            username && email && password && phoneNumber && emailAvailable && phoneNumberAvailable && !passwordError
        );
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        validateForm();
        setLoading(true);
        try {
            const response = await axios.post('https://jwt-rj8s.onrender.com/signup', {
                username,
                email,
                password,
                phoneNumber
            });
            setMessage('User registered successfully!');
            navigate('/login');
        } catch (error) {
            setMessage('Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <UsernameAuthentication username={username} setUsername={setUsername} />
            <EmailAuthentication
                email={email}
                setEmail={setEmail}
                setEmailAvailable={setEmailAvailable}
                setEmailMessage={setEmailMessage}
                validateForm={validateForm}
            />
            <PasswordVerification
                password={password}
                setPassword={setPassword}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
            />
            <PhoneNumberVerification
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                setPhoneNumberAvailable={setPhoneNumberAvailable}
                setPhoneNumberMessage={setPhoneNumberMessage}
                validateForm={validateForm}
            />
            <button type="submit" disabled={!isFormValid || loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
            </button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Signup;