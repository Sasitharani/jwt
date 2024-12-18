import React from 'react';

const Tooltip = ({ message, children }) => {
    return (
        <div className="relative flex items-center">
            {children}
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                {message}
            </div>
        </div>
    );
};

export default Tooltip;