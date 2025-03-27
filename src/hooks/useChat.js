import { useState, useEffect } from 'react';

const useChat = (roomId) => {
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        // Initialize chat for this room
        // You might want to fetch previous messages here
        console.log(`Chat initialized for room ${roomId}`);
        
        // Cleanup function
        return () => {
            console.log(`Chat cleanup for room ${roomId}`);
        };
    }, [roomId]);
    
    const sendMessage = (text) => {
        if (!text.trim()) return;
        
        // In a real app, you'd send this to your backend
        const newMessage = {
            id: Date.now(),
            text,
            sender: 'You', // In a real app, this would be the user's name
            timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, newMessage]);
    };
    
    return {
        messages,
        sendMessage
    };
};

export default useChat;