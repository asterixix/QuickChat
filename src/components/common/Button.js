import React from 'react';

const Button = ({ onClick, children, className, disabled }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;