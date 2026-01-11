import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleRankings } from '../data/sampleRankings';
import type { RankingModel, UserSubmission } from '../models/Ranking';
import { processSubmission, validateSubmission } from '../utils/scoringUtils';

interface RankingContextValue {
    rankings: RankingModel[];
    setRankings: React.Dispatch<React.SetStateAction<RankingModel[]>>;
    submitRanking: (rankingId: string, submission: UserSubmission) => boolean;
    currentUserId: string;
}

const RankingContext = createContext<RankingContextValue | undefined>(undefined);

export const RankingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [rankings, setRankings] = useState<RankingModel[]>([]);
    // Mock user ID - in a real app, this would come from authentication
    const [currentUserId] = useState<string>(() => {
        const stored = localStorage.getItem('userId');
        if (stored) return stored;
        const newId = `user_${Date.now()}`;
        localStorage.setItem('userId', newId);
        return newId;
    });

    useEffect(() => {
        // Load sample data on app initialization
        setRankings(sampleRankings);
    }, []);

    const submitRanking = (rankingId: string, submission: UserSubmission): boolean => {
        // Validate submission
        if (!validateSubmission(submission)) {
            console.error('Invalid submission');
            return false;
        }

        const ranking = rankings.find(r => r.id === rankingId);
        if (!ranking) {
            console.error('Ranking not found');
            return false;
        }

        // Check if user has already voted
        if (ranking.votes.includes(currentUserId)) {
            console.error('User has already voted');
            return false;
        }

        // Process the submission
        const updatedRanking = processSubmission(ranking, submission);

        // Update rankings state
        setRankings(prevRankings =>
            prevRankings.map(r => r.id === rankingId ? updatedRanking : r)
        );

        return true;
    };

    return (
        <RankingContext.Provider value={{ rankings, setRankings, submitRanking, currentUserId }}>
            {children}
        </RankingContext.Provider>
    );
};

export const useRankingContext = () => {
    const context = useContext(RankingContext);
    if (!context) {
        throw new Error('useRankingContext must be used within a RankingProvider');
    }
    return context;
};