export const generateUniqueId = () => {
    return 'id-' + Math.random().toString(36).substr(2, 9);
};

export const validatePin = (pin) => {
    const pinPattern = /^[0-9]{4}$/; // Example: 4-digit PIN
    return pinPattern.test(pin);
};

export const formatDateForCalendar = (date) => {
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
};

export const isValidPhoneNumber = (phone) => {
    const phonePattern = /^\+?[1-9]\d{1,14}$/; // E.164 format
    return phonePattern.test(phone);
};