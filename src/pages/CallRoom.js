import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCall } from '../contexts/CallContext';
import useChat from '../hooks/useChat';
import ChatWindow from '../components/chat/ChatWindow';
import ChatInput from '../components/chat/ChatInput';
import CallControls from '../components/call/CallControls';
import ScreenSharing from '../components/call/ScreenSharing';
import Reactions from '../components/call/Reactions';

const CallRoom = () => {
    const { callId } = useParams();
    const { joinCall, leaveCall, callState } = useCall();
    const [pinEntry, setPinEntry] = useState('');
    const [isPinEntered, setIsPinEntered] = useState(false);
    
    // Initialize chat with callId
    const { messages, sendMessage } = useChat(callId);

    useEffect(() => {
        // Clean up on component unmount
        return () => {
            leaveCall();
        };
    }, [leaveCall]);

    const handlePinSubmit = (e) => {
        e.preventDefault();
        if (pinEntry) {
            joinCall(callId, pinEntry);
            setIsPinEntered(true);
        }
    };

    const handleSendMessage = (messageText) => {
        sendMessage(messageText);
    };

    if (!isPinEntered) {
        return (
            <div className="flex items-center justify-center h-screen">
                <form onSubmit={handlePinSubmit} className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Enter PIN to Join Call</h2>
                    <input
                        type="password"
                        placeholder="Enter 6-digit PIN"
                        value={pinEntry}
                        onChange={(e) => setPinEntry(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Join Call
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 p-4 flex">
                {/* Main video area - 70% width */}
                <div className="w-3/4 bg-gray-800 rounded-lg mr-4 flex flex-col">
                    <div className="flex-1 relative">
                        {/* Video content would go here */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="text-white text-2xl">Call: {callId}</h2>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-700 rounded-b-lg">
                        <CallControls />
                        <ScreenSharing />
                        <Reactions />
                    </div>
                </div>
                
                {/* Chat area - 30% width */}
                <div className="w-1/4 bg-white rounded-lg shadow flex flex-col">
                    <div className="p-3 border-b border-gray-200">
                        <h3 className="font-bold">Chat</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        <ChatWindow messages={messages} />
                    </div>
                    <div className="p-3 border-t border-gray-200">
                        <ChatInput onSendMessage={handleSendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallRoom;