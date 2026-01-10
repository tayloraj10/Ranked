import React from 'react';
import './Ranking.css';
import type { RankingModel } from '../models/Ranking';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface RankingProps {
    ranking: RankingModel;
}

const Ranking: React.FC<RankingProps> = ({ ranking }) => {
    const handleVote = (optionId: string, direction: 'up' | 'down') => {
        console.log(`Voted ${direction} for option ${optionId}`);
        // Add logic to handle voting here
    };

    return (
        <div className="ranking-container">
            <h3 className="ranking-title">{ranking.title}</h3>
            <ul className="ranking-options">
                {ranking.options.map((option) => (
                    <li key={option.id} className="ranking-option">
                        <div className="option-title">{option.title}</div>
                        <div className="option-details">
                            <span className="option-votes">Votes: {option.votes}</span>
                        </div>
                        <div className="vote-buttons">
                            <button
                                className="vote-button upvote"
                                onClick={() => handleVote(option.id, 'up')}
                            >
                                <FaArrowUp />
                            </button>
                            <button
                                className="vote-button downvote"
                                onClick={() => handleVote(option.id, 'down')}
                            >
                                <FaArrowDown />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Ranking;