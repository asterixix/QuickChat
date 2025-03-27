import React, { useEffect, useState } from 'react';

const ScreenSharing = ({ isSharing, onShare, onStop }) => {
    const [stream, setStream] = useState(null);

    const startScreenShare = async () => {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true,
            });
            setStream(screenStream);
            onShare(screenStream);
        } catch (error) {
            console.error("Error starting screen share:", error);
        }
    };

    const stopScreenShare = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            onStop();
        }
    };

    useEffect(() => {
        if (isSharing) {
            startScreenShare();
        } else {
            stopScreenShare();
        }
    }, [isSharing]);

    return (
        <div className="screen-sharing">
            {isSharing ? (
                <button onClick={stopScreenShare} className="bg-red-500 text-white p-2 rounded">
                    Stop Sharing
                </button>
            ) : (
                <button onClick={startScreenShare} className="bg-green-500 text-white p-2 rounded">
                    Share Screen
                </button>
            )}
        </div>
    );
};

export default ScreenSharing;