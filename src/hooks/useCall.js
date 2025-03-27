import { useState, useEffect, useContext } from 'react';
import { CallContext } from '../contexts/CallContext';
import cloudflareCallsApi from '../services/cloudflareCallsApi';

const useCall = () => {
    const { callState, startCall: startCallContext, endCall: endCallContext } = useContext(CallContext);
    const [callId, setCallId] = useState(null);
    const [pin, setPin] = useState('');
    const [isCallActive, setIsCallActive] = useState(false);

    // Start call function
    const startCall = async (id, pinCode) => {
        try {
            const response = await cloudflareCallsApi.createCall(id, pinCode);
            startCallContext(id, pinCode);
            setIsCallActive(true);
            setCallId(id);
            setPin(pinCode);
            return response;
        } catch (error) {
            console.error('Error starting call:', error);
            throw error;
        }
    };

    // Join call function
    const joinCall = async (id, pinCode) => {
        try {
            const response = await cloudflareCallsApi.joinCall(id, pinCode);
            startCallContext(id, pinCode);
            setIsCallActive(true);
            setCallId(id);
            setPin(pinCode);
            return response;
        } catch (error) {
            console.error('Error joining call:', error);
            throw error;
        }
    };

    // End call function
    const endCall = async () => {
        try {
            if (callId) {
                await cloudflareCallsApi.endCall(callId);
            }
            endCallContext();
            setIsCallActive(false);
            setCallId(null);
            setPin('');
        } catch (error) {
            console.error('Error ending call:', error);
        }
    };

    // Add leaveCall as an alias to endCall
    const leaveCall = endCall;

    useEffect(() => {
        return () => {
            if (isCallActive) {
                endCall();
            }
        };
    }, [isCallActive]);

    return {
        callId,
        pin,
        isCallActive,
        startCall,
        joinCall,
        endCall,
        leaveCall, // Add leaveCall to the returned object
    };
};

export default useCall;