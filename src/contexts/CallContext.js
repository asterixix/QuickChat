import React, { createContext, useState, useContext } from 'react';

// Export the context so it can be imported elsewhere
export const CallContext = createContext();

export const CallProvider = ({ children }) => {
    const [callState, setCallState] = useState({
        isInCall: false,
        callId: null,
        pin: null,
        participants: [],
    });

    const startCall = (id, pin) => {
        setCallState({
            ...callState,
            isInCall: true,
            callId: id,
            pin: pin,
        });
    };

    const endCall = () => {
        setCallState({
            ...callState,
            isInCall: false,
            callId: null,
            pin: null,
            participants: [],
        });
    };

    const addParticipant = (participant) => {
        setCallState((prevState) => ({
            ...prevState,
            participants: [...prevState.participants, participant],
        }));
    };

    const removeParticipant = (participant) => {
        setCallState((prevState) => ({
            ...prevState,
            participants: prevState.participants.filter(p => p !== participant),
        }));
    };

    return (
        <CallContext.Provider value={{ callState, startCall, endCall, addParticipant, removeParticipant }}>
            {children}
        </CallContext.Provider>
    );
};

export const useCall = () => {
    return useContext(CallContext);
};