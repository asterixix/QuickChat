import React from 'react';

const CallControls = ({ onMute, onHangUp, onToggleVideo, isMuted, isVideoEnabled }) => {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <button 
                onClick={onMute} 
                className={`p-2 rounded ${isMuted ? 'bg-red-600' : 'bg-green-600'}`}
            >
                {isMuted ? 'Unmute' : 'Mute'}
            </button>
            <button 
                onClick={onHangUp} 
                className="p-2 bg-red-600 rounded"
            >
                Hang Up
            </button>
            <button 
                onClick={onToggleVideo} 
                className={`p-2 rounded ${isVideoEnabled ? 'bg-green-600' : 'bg-red-600'}`}
            >
                {isVideoEnabled ? 'Disable Video' : 'Enable Video'}
            </button>
        </div>
    );
};

export default CallControls;