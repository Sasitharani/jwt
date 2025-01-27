import React from 'react';

const test = () => {
    return (
        <div className="bg-[#F5CEC7] flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#E79796]">Login</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-[#C6C09C] mb-2" htmlFor="email">Email</label>
                        <input className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC98B]" type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-[#C6C09C] mb-2" htmlFor="password">Password</label>
                        <input className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC98B]" type="password" id="password" placeholder="Enter your password" />
                    </div>
                    <button className="w-full bg-[#FFB284] text-white p-3 rounded-lg hover:bg-[#FFC98B] transition duration-300">Login</button>
                </form>
                <div className="mt-6 text-center">
                    <button className="w-full bg-[#E79796] text-white p-3 rounded-lg hover:bg-[#FFB284] transition duration-300 flex items-center justify-center">
                        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-6 h-6 mr-2" />
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default test;