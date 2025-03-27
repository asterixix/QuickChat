import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../services/twilioService'; // Assuming you have a service for Twilio authentication

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithPhone = async (phoneNumber) => {
        // Implement phone sign-in logic using Twilio
    };

    const verifyOTP = async (otp) => {
        // Implement OTP verification logic using Twilio
    };

    const signOut = async () => {
        // Implement sign-out logic
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithPhone, verifyOTP, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};