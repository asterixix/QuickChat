import React, { useState } from 'react';
import useCall from '../../hooks/useCall';
import Button from '../common/Button';
import { useHistory } from 'react-router-dom';

const QuickCall = () => {
    const { startCall } = useCall();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [callId, setCallId] = useState('');
    const [pin, setPin] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const generateRandomId = () => {
        return Math.random().toString(36).substring(2, 8); // Creates a 6 character random string
    };

    const generatePin = () => {
        return Math.floor(100000 + Math.random() * 900000).toString(); // Creates a 6 digit PIN
    };

    const handleStartCall = async () => {
        setIsLoading(true);
        setError('');
        
        // Generate random ID and PIN
        const newCallId = generateRandomId();
        const newPin = generatePin();
        
        setCallId(newCallId);
        setPin(newPin);
        
        try {
            const response = await startCall(newCallId, newPin);
            console.log("Call started successfully:", response);
            setShowModal(true);
        } catch (error) {
            console.error('Failed to start call:', error);
            setError(`Failed to start call: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleJoinCall = () => {
        setShowModal(false);
        history.push(`/call/${callId}`);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-bold mb-4">Quick Call</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            
            <Button 
                onClick={handleStartCall} 
                disabled={isLoading}
                className={`${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded`}
            >
                {isLoading ? 'Starting...' : 'Start New Call'}
            </Button>

            {/* Call Details Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h3 className="text-lg font-bold mb-4">Call Created!</h3>
                        <p className="mb-2"><strong>Call ID:</strong> {callId}</p>
                        <p className="mb-4"><strong>PIN:</strong> {pin}</p>
                        <p className="mb-4 text-sm text-gray-600">Share these details with participants who want to join your call.</p>
                        <div className="flex justify-end">
                            <Button 
                                onClick={handleJoinCall}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Join Call Now
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuickCall;