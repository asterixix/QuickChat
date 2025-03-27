import React from 'react';

const ChatWindow = ({ messages = [] }) => {
    return (
        <div className="flex flex-col h-full p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex-1 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        <span className="font-semibold">{msg.sender}: </span>
                        <span>{msg.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatWindow;