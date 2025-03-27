import React from 'react';

const Reactions = ({ onReaction }) => {
    const reactions = ['👍', '❤️', '😂', '😮', '😢', '👎'];

    return (
        <div className="flex space-x-2">
            {reactions.map((reaction, index) => (
                <button
                    key={index}
                    className="text-2xl hover:scale-110 transition-transform"
                    onClick={() => onReaction(reaction)}
                >
                    {reaction}
                </button>
            ))}
        </div>
    );
};

export default Reactions;