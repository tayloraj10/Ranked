import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleRankings } from '../data/sampleRankings';
import type { RankingModel } from '../models/Ranking';

interface RankingContextValue {
    rankings: RankingModel[];
    setRankings: React.Dispatch<React.SetStateAction<RankingModel[]>>;
}

const RankingContext = createContext<RankingContextValue | undefined>(undefined);

export const RankingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [rankings, setRankings] = useState<RankingModel[]>([]);

    useEffect(() => {
        // Load sample data on app initialization
        setRankings(sampleRankings);
    }, []);

    return (
        <RankingContext.Provider value={{ rankings, setRankings }}>
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