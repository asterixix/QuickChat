import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, className }) => {
    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && <label className="mb-2 text-sm font-medium">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default Input;