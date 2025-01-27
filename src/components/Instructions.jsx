import React from 'react';
import { Link } from 'react-router-dom';

const Instructions = () => {
    return (
        <div className="bg-gray-200 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl"> {/* Increased width by an additional 40% */}
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Instructions</h1>
                <div className="mb-6">
                    <p className='mt-6'><strong>1. Upload Your Own Image</strong></p>
                    <div className="ml-4 mt-3">
                        <p className="ml-4"><em>i. Navigate to the contest page.</em></p>
                        <p className="ml-4"><em>ii. Click on the <strong>"Upload Image"</strong> button.</em></p>
                        <p className="ml-4"><em>iii. Select the image you want to upload from your device.</em></p>
                        <p className="ml-4"><em>iv. Provide any necessary details and submit the image.</em></p>
                    </div>
                    
                    <p className='mt-6'><strong>2. The Image Will Be Sent to Voting</strong></p>
                    <div className="ml-4">
                        <p className="ml-4"><em>i. Once your image is uploaded, it will be automatically entered into the voting pool.</em></p>
                        <p className="ml-4"><em>ii. Users can view and vote for your image.</em></p>
                    </div>
                    
                    <p className='mt-6'><strong>3. Any Registered User Can Vote for the Image</strong></p>
                    <div className="ml-4">
                        <p className="ml-4"><em>i. Ensure you are registered and logged in to vote.</em></p>
                        <p className="ml-4"><em>ii. Browse through the images and click the <strong>"Vote"</strong> button to cast your vote.</em></p>
                    </div>
                    
                    <p className='mt-6'><strong>4. Daily Votes for Registered Users</strong></p>
                    <div className="ml-4">
                        <p className="ml-4"><em>i. Each registered user receives 10 votes every day upon logging in.</em></p>
                        <p className="ml-4"><em>ii. Use these votes to support your favorite images.</em></p>
                    </div>
                    
                    <p className='mt-6'><strong>5. Additional Votes via Spinning Wheel</strong></p>
                    <div className="ml-4">
                        <p className="ml-4"><em>i. If you run out of votes, you can use the spinning wheel to earn more.</em></p>
                        <p className="ml-4"><em>ii. Navigate to the spinning wheel section and spin to win additional votes.</em></p>
                    </div>
                    
                    <p className='mt-6'><strong>6. Spinning Wheel Restrictions</strong></p>
                    <div className="ml-4">
                        <p className="ml-4"><em>i. The spinning wheel can be used only once every two hours.</em></p>
                        <p className="ml-4"><em>ii. Plan your spins accordingly to maximize your votes.</em></p>
                    </div>
                    
                    <p className='mt-6'><strong>7. Winning Criteria</strong></p>
                    <div className="ml-4">
                        <p className="ml-4"><em>i. The photo with the highest number of votes at the end of the contest period wins.</em></p>
                        <p className="ml-4"><em>ii. Encourage your friends and followers to vote for your image to increase your chances of winning.</em></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructions;
