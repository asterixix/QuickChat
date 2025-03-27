import React from 'react';
import QuickCall from '../components/call/QuickCall';
import ChatWindow from '../components/chat/ChatWindow';
import ChatInput from '../components/chat/ChatInput';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">QuickChat App</h1>
            <QuickCall />
        </div>
    );
};

export default Home;