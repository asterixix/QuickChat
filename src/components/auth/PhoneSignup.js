import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../common/Input';
import Button from '../common/Button';

const PhoneSignup = () => {
    const { sendOtp } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!phoneNumber) {
            setError('Phone number is required');
            return;
        }
        setError('');
        try {
            await sendOtp(phoneNumber);
            // Handle successful OTP send (e.g., navigate to OTP verification)
        } catch (err) {
            setError('Failed to send OTP. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Phone Number Signup</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mb-4"
                />
                <Button type="submit" className="w-full">
                    Send OTP
                </Button>
            </form>
        </div>
    );
};

export default PhoneSignup;