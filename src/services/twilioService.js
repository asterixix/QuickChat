import axios from 'axios';

const TWILIO_API_BASE_URL = 'https://api.twilio.com/2010-04-01';
const ACCOUNT_SID = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
const FROM_PHONE_NUMBER = process.env.REACT_APP_TWILIO_FROM_PHONE_NUMBER;

// Add this near the top of the file
export const auth = {
  onAuthStateChanged: (callback) => {
    // Basic implementation
    const user = localStorage.getItem('user') 
      ? JSON.parse(localStorage.getItem('user')) 
      : null;
    callback(user);
    return () => {}; // Unsubscribe function
  }
};

// Create Axios client
const twilioClient = axios.create({
    baseURL: TWILIO_API_BASE_URL,
    auth: {
        username: ACCOUNT_SID,
        password: AUTH_TOKEN,
    },
});

// Add missing exports
export const signInWithPhoneNumber = async (phoneNumber) => {
  const otp = await sendOtp(phoneNumber);
  return { user: { phoneNumber } };
};

export const verifyOTP = async (otp) => {
  // Mock implementation
  return { user: { verified: true } };
};

export const sendOtp = async (phoneNumber) => {
    try {
        const response = await twilioClient.post(`/Accounts/${ACCOUNT_SID}/Messages.json`, {
            From: FROM_PHONE_NUMBER,
            To: phoneNumber,
            Body: 'Your OTP code is: ' + Math.floor(100000 + Math.random() * 900000), // Generate a random 6-digit OTP
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to send OTP: ' + error.message);
    }
};

export const verifyOtp = async (phoneNumber, otp) => {
    // Implement OTP verification logic here
    // This could involve checking the OTP against a database or an in-memory store
    // For now, we will just return a success message for demonstration purposes
    return { success: true, message: 'OTP verified successfully' };
};