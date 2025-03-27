import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { signInWithPhoneNumber, verifyOTP } from '../services/twilioService';

const useAuth = () => {
    const { setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signUp = async (phoneNumber) => {
        setLoading(true);
        setError(null);
        try {
            const response = await signInWithPhoneNumber(phoneNumber);
            setUser(response.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const verifyCode = async (otp) => {
        setLoading(true);
        setError(null);
        try {
            const response = await verifyOTP(otp);
            setUser(response.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        signUp,
        verifyCode,
        loading,
        error,
    };
};

export default useAuth;