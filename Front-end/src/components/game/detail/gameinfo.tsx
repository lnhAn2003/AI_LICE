// src/components/game/detail/gameinfo.tsx
import React from 'react';
import { GameData } from '../../../types/game';

interface GameInfoProps {
    game: GameData;
}

const GameInfo: React.FC<GameInfoProps> = ({ game }) => {
    return (
        <section className="border-b pb-4">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-800 dark:text-gray-100">
                {game.title}
            </h1>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                    <span className="text-gray-500">Uploaded By:</span>
                    <p className="ml-2 hover:underline cursor-pointer hover:text-red-600">{game.uploadedBy.username}</p>
                </div>
                <div>
                    <strong>Date Uploaded:</strong> {game.dateUploaded}
                </div>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                    src={game.coverImage}
                    alt={`${game.title} Cover`}
                    className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-105"
                />
            </div>
        </section>
    );
};

export default GameInfo;